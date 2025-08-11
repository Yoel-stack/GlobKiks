import type { Metadata } from "next";
import { titleFont } from "@/config/fonts";
import { ClerkProvider } from '@clerk/nextjs';
import { AddressProvider, CartProvider, NextThemeProvider, OrderProvider } from "@/components";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
  title: "Shoes Shop",
  description: "Una tienda virtual de championes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OrderProvider>
      <ClerkProvider>
        <NextThemeProvider>
        <html lang="es">
          <body className={`${titleFont.className} antialiased`}>
            <AddressProvider>
              <CartProvider>{children}</CartProvider>
            </AddressProvider>
          </body>
        </html>
        </NextThemeProvider>
      </ClerkProvider>
    </OrderProvider>
  );
}
