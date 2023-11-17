'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import style from "./ActiveLink.module.css";

interface Props {
    text: string;
    path: string;
}

export const ActiveLink = ({ path, text }: Props) => {

    const pathName = usePathname();
    console.log(pathName)

    return (
        <Link
            className={`${style.link} ${(pathName === path) && style['active-link']}`}
            href={path}>
            {text}
        </Link>
    );
};
