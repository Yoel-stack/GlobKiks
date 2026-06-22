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

          {children}
        </main>
        <main>
          <Footer />
        </main>
      </AddressProvider>
    </OrderProvider>
  );
};
