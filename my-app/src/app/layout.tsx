import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { geistSans, titleFont } from "@/config/fonts";


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
    <html lang="es">
      <body
        className={`${titleFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
