import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server'
import { uptime } from 'process';
import * as yup from 'yup';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take') ?? 10);
    const skip = Number(searchParams.get('skip') ?? 0);
    if (isNaN(take)) {
        return NextResponse.json({ message: 'Take tiene que ser un número' }, { status: 400 })
    }
    if (isNaN(skip)) {
        return NextResponse.json({ message: 'Skip tiene que ser un número' }, { status: 400 })
    }


    const todos = await prisma.todo.findMany({
        take: take,
        skip: skip,
    });


    return NextResponse.json(todos)
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false)
})

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
    

        const {complete, description} = await postSchema.validate(await request.json());

        if( !session?.user) {
            return NextResponse.json('No autorizado', {status:401})
        }

        const todo = await prisma.todo.create({data:{complete, description, userId: session.user.id}});
    
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json(error,{status:400});
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if( !session?.user) {
            return NextResponse.json('No autorizado', {status:401})
        }

        await prisma.todo.deleteMany({where: {complete: true, userId: session.user.id}})

        return NextResponse.json({messages: 'Tareas completadas borradas'}, { status: 200 });
    } catch (error) {
        return NextResponse.json(error,{status:400});
    }
}