export const dynamic = 'force-dynamic'
export const revalidate = 0;

import {NewTodo, TodosGrid }from "@/todos";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { userAgent } from "next/server";


export const metadata = {
  title: 'Listado de Todos',
  description: 'Listado de Todos',
};


export default async function ServerTodoPage() {

  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" },where:{userId: session.user.id} });


  return (
      <div>
        <span className="text-3xl mb-10">Server Actions</span>
        <div className="w-full px-3 mx-5 mb-5">
          <NewTodo />
        </div>

        <TodosGrid todos={todos} />
      </div>
  );
}