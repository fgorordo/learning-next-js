import { TabBar } from "@/components";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: 'Cookies Page',
    description: 'Página de cookies'
}


export default function CookiesPage() {


    const cookieStore = cookies();
    const cookieTab = Number(cookieStore.get('selected-tab')?.value) ?? 1;
    const allCookies = cookieStore.getAll();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col">
                <span className="text-3xl">Tabs</span>
                <TabBar currentTab={cookieTab}/>
            </div>
        </div>
    );
}