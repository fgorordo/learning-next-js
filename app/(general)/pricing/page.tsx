import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Servicios',
    description: 'Seccion de servicios y pricing de Fernando Gorordo',
    keywords:['Pricing Page', 'Fernando', 'pricing', 'servicios']
};

export default function PricingPage() {
    return (
        <>
            <div className="text-5xl">Pricing Page</div>
        </>
    )
}
