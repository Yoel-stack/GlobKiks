import { TopMenu, Sidebar } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
        <TopMenu/>
        <Sidebar/>

      <div className="p-3 p-sm-10">{children}</div>
    </main>
  );
}
