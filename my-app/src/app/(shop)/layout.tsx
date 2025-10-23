import { TopMenu, Sidebar, OrderProvider } from "@/components";
import { Footer } from "@/components/ui/footer/Footer";
import { AddressProvider } from "@/components";


export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderProvider>
      <AddressProvider>
        <main className="min-h-screen">
          <TopMenu />
          <Sidebar />

          <div className="p-3 p-sm-10">{children}</div>
        </main>
        <main>
          <Footer />
        </main>
      </AddressProvider>
    </OrderProvider>
  );
};
