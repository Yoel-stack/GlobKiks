import type { Metadata } from "next";
import { titleFont } from "@/config/fonts";
import { ClerkProvider } from '@clerk/nextjs';
import { AddressProvider, CartProvider, NextThemeProvider, OrderProvider } from "@/components";
import { ToastContainer } from 'react-toastify';
import { esES } from '@clerk/localizations'

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
  title: "GlobKiks",
  description: "Una tienda virtual de championes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHidrationWarning - hay una diferencia entre el HTML generado por el servidor y el que se renderiza en el cliente y esto elimina el error
    <html lang="ES" suppressHydrationWarning>
      <body className={`${titleFont.className} antialiased`}>
        <OrderProvider>
          <ClerkProvider 
          localization={esES}>
            <NextThemeProvider>
              <AddressProvider>
                <ToastContainer position="top-right" autoClose={500} />
                <CartProvider>{children}</CartProvider>
              </AddressProvider>
            </NextThemeProvider>
          </ClerkProvider>
        </OrderProvider>
      </body>
    </html>
  );
};
