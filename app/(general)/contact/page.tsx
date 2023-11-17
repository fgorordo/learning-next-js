import type { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Contacto',
    description: 'Seccion de contact con Fernando Gorordo',
    keywords:['Contact Page', 'Fernando', 'contacto', '...'],
};

export default function ContactPage() {
    return (
        <>
            <span className="text-5xl">Contact Page</span>
        </>
    )
}