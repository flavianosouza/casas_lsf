import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Casas LSF | Portal de Construção Inteligente",
  description: "O maior portal de construção em Light Steel Framing de Portugal. Plantas, orçamentos e guias técnicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
