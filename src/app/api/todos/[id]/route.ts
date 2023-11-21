import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from "yup";

interface Arguments {
    params: {
        id: string;
    }
}


const getTodo = async (id: string):Promise<Todo | null> => {
    return await prisma.todo.findFirst({where: {id}});
}

export async function GET(request: Request, {params}: Arguments) {

    const todo = await getTodo(params.id)
    if (!todo) return NextResponse.json({message: `Todo with ID: ${params.id} not found`},{status: 404})

    return NextResponse.json(todo);
}

const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional(),
})

export async function PUT(request: Request, {params}: Arguments) {
    const {id} = params;

    const todo = await getTodo(id);
    if (!todo) return NextResponse.json({message: `Todo with ID: ${id} not found`},{status: 404})

    try {
        const {complete, description} = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({where: {id},data:{complete, description}})
    
        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json(error,{status: 400})
    }
}