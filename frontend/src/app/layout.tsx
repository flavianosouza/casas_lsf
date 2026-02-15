import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://casaslsf.com"),
  title: {
    default: "Casas LSF | Construção em Aço Leve em Portugal",
    template: "%s | Casas LSF",
  },
  description:
    "O maior portal de construção em Light Steel Framing de Portugal. Plantas, orçamentos, simulador de custos e guias técnicos. OBRASNET UNIP LDA.",
  keywords: [
    "casas LSF",
    "Light Steel Framing",
    "construção aço leve",
    "casas pré-fabricadas Portugal",
    "construção modular",
    "orçamento construção",
    "casas metálicas",
    "OBRASNET",
  ],
  authors: [{ name: "OBRASNET UNIP LDA" }],
  creator: "OBRASNET UNIP LDA",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://casaslsf.com",
    siteName: "Casas LSF",
    title: "Casas LSF | Construção em Aço Leve em Portugal",
    description:
      "O maior portal de construção em Light Steel Framing de Portugal. Plantas, orçamentos e guias técnicos.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://casaslsf.com",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OBRASNET UNIP LDA",
  alternateName: "Casas LSF",
  url: "https://casaslsf.com",
  logo: "https://casaslsf.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+351930423456",
    contactType: "sales",
    availableLanguage: "Portuguese",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Abade Faria 18, 1.o Dto",
    addressLocality: "Mem Martins, Sintra",
    postalCode: "2725-475",
    addressCountry: "PT",
  },
  taxID: "515866989",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
