"use client";

import { IoCartOutline } from "react-icons/io5"
import { SimpleWidget } from "./SimpleWidget"
import { useAppSelector } from "@/store";

export const WidgetsGrid = () => {

    const count = useAppSelector(state => state.counter.count)

    return (
        <div className="flex flex-wrap p-2 items-center justify-center">
            <SimpleWidget
                title={count.toString()}
                subtitle="Productos"
                icon={<IoCartOutline size={70} />}
                label={"Productos en carrito"}
                href="/dashboard/counter" />
            <SimpleWidget title='Estado vacio' />
        </div>
    )
}
