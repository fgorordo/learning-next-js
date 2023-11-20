import { SimpleWidget, WidgetsGrid } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: "SEO Description"
}

export default function MainPage() {
  return (
    <div className="text-black">
      <h1 className="mt-2 text-3xl">Dashboard</h1>
      <span className="text-xl">Información general.</span>
      <WidgetsGrid />
    </div>
  );
}