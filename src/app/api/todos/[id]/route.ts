import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from "yup";
import { authOptions } from '../../auth/[...nextauth]/route';

interface Arguments {
    params: {
        id: string;
    }
}


const getTodo = async (id: string): Promise<Todo | null> => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return null;
    }

    const todo =  await prisma.todo.findFirst({ where: { id } });
    if(todo?.userId !== session.user.id) return null

    return todo
}

export async function GET(request: Request, { params }: Arguments) {

    const todo = await getTodo(params.id)
    if (!todo) return NextResponse.json({ message: `Todo with ID: ${params.id} not found` }, { status: 404 })

    return NextResponse.json(todo);
}

const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional(),
})

export async function PUT(request: Request, { params }: Arguments) {
    const { id } = params;

    const todo = await getTodo(id);
    if (!todo) return NextResponse.json({ message: `Todo with ID: ${id} not found` }, { status: 404 })

    try {
        const { complete, description } = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({ where: { id }, data: { complete, description } })

        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}