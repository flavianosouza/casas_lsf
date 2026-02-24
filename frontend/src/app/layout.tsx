import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExitIntentCapture from "@/components/ExitIntentCapture";

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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://casaslsf.com/#localbusiness",
  name: "OBRASNET UNIP LDA",
  alternateName: "Casas LSF",
  image: "https://casaslsf.com/logo.png",
  url: "https://casaslsf.com",
  telephone: "+351930423456",
  email: "orcamento@casaslsf.com",
  description:
    "Empresa especializada em construção LSF (Light Steel Framing) em Portugal. Projetos de raiz, do terreno à chave na mão.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Abade Faria 18, 1.o Dto",
    addressLocality: "Mem Martins",
    addressRegion: "Sintra",
    postalCode: "2725-475",
    addressCountry: "PT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.7935,
    longitude: -9.3472,
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className={inter.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9HVPSLW5W5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9HVPSLW5W5');
          `}
        </Script>
        <Navbar />
        {children}
        <Footer />
        <ExitIntentCapture />
      </body>
    </html>
  );
}
```

---

## 🔧 PASSOS
```
1. Seleciona TODO o texto no GitHub (Ctrl+A)
2. Cola este código novo
3. Clica "Commit changes..."
4. Clica "Commit changes" (confirmar)
5. EasyPanel → frontend → Implantar
