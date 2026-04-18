import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { permanentRedirect } from "next/navigation";
import { Calculator, ArrowRight, Home, Ruler } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";
import AssistantLazy from "@/components/assistant/AssistantLazy";
import PortfolioSpecs from "@/components/PortfolioSpecs";
import {
  PORTFOLIO_ENTRIES,
  PORTFOLIO_BY_SLUG,
  COMMON_FAQS,
  COMMON_BOILERPLATE,
  type PortfolioEntry,
} from "@/data/portfolio-map";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const SITE_URL = "https://casaslsf.com";

interface PortfolioData {
  projeto_id: number;
  tipologia: string | null;
  area_m2: number | null;
  num_pisos: number | null;
  tem_cave: boolean | null;
  tem_sotao: boolean | null;
  valor_total: number | null;
  padrao_acabamento: string | null;
  drive_file_id: string | null;
  drive_url: string | null;
}

async function getPortfolioData(projetoId: number): Promise<PortfolioData | null> {
  try {
    const res = await fetch(`${API_URL}/api/portfolio/${projetoId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return PORTFOLIO_ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = PORTFOLIO_BY_SLUG[slug];

  if (!entry) {
    return { title: "Modelo não encontrado | Casas LSF" };
  }

  return {
    title: entry.metaTitle,
    description: entry.metaDescription,
    keywords: [
      entry.urlTipologia,
      "casas LSF",
      "moradia chave na mão",
      "portugal",
      "light steel framing",
      "construção modular",
    ],
    alternates: { canonical: `${SITE_URL}/portfolio/${entry.slug}` },
    openGraph: {
      title: entry.metaTitle,
      description: entry.metaDescription,
      url: `${SITE_URL}/portfolio/${entry.slug}`,
      type: "website",
      siteName: "Casas LSF",
    },
  };
}

function formatEur(value: number | null): string {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

function getRelatedEntries(current: PortfolioEntry): PortfolioEntry[] {
  // Prefer same tipologia, then fill with others. Exclude current.
  const sameTipo = PORTFOLIO_ENTRIES.filter(
    (e) => e.slug !== current.slug && e.urlTipologia === current.urlTipologia,
  );
  const others = PORTFOLIO_ENTRIES.filter(
    (e) => e.slug !== current.slug && e.urlTipologia !== current.urlTipologia,
  );
  return [...sameTipo, ...others].slice(0, 3);
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = PORTFOLIO_BY_SLUG[slug];

  if (!entry) {
    // Fallback: any /portfolio/* not in our map 301s to /plantas
    permanentRedirect("/plantas");
  }

  const data = await getPortfolioData(entry.projetoId);

  const breadcrumbs = [
    { label: "Início", href: "/" },
    { label: "Plantas", href: "/plantas" },
    { label: entry.h1 },
  ];

  const realArea = data?.area_m2 ?? null;
  const hasAreaMismatch =
    entry.urlAreaM2 !== null && realArea !== null && entry.urlAreaM2 !== realArea;

  const pricePerM2 =
    data?.valor_total && realArea ? Math.round(data.valor_total / realArea) : null;

  // JSON-LD schemas
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: entry.h1,
    description: entry.metaDescription,
    brand: { "@type": "Brand", name: "Casas LSF" },
    manufacturer: {
      "@type": "Organization",
      name: "OBRASNET UNIP LDA",
      url: SITE_URL,
    },
    category: "Construção Light Steel Framing",
    ...(data?.valor_total
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: data.valor_total.toFixed(2),
            availability: "https://schema.org/InStock",
            priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
            seller: {
              "@type": "Organization",
              name: "OBRASNET UNIP LDA",
            },
          },
        }
      : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Plantas",
        item: `${SITE_URL}/plantas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: entry.h1,
        item: `${SITE_URL}/portfolio/${entry.slug}`,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COMMON_FAQS.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };

  const related = getRelatedEntries(entry);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <main className="min-h-screen bg-transparent py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mb-12 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Modelo Inspirado em Projeto Real
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              {entry.h1}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              {entry.heroSubtitle}
            </p>

            {/* Stats chips */}
            <div className="flex flex-wrap gap-3 mt-8">
              {data?.tipologia && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                  <Home className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">Tipologia:</span>
                  <span className="text-white font-bold">{data.tipologia}</span>
                </span>
              )}
              {realArea !== null && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                  <Ruler className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">Área:</span>
                  <span className="text-white font-bold">{realArea} m²</span>
                </span>
              )}
              {data?.num_pisos !== null && data?.num_pisos !== undefined && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                  <span className="text-gray-400">Pisos:</span>
                  <span className="text-white font-bold">{data.num_pisos}</span>
                </span>
              )}
            </div>

            {hasAreaMismatch && (
              <p className="mt-6 text-sm text-gray-500 italic">
                Nota: este modelo tem área real construída de {realArea} m² (o
                URL refere {entry.urlAreaM2} m² por razões históricas). As
                especificações e preços apresentados correspondem ao projecto
                real entregue.
              </p>
            )}
          </header>

          <AssistantLazy />

          {/* Hero image — planta 2D */}
          {data?.drive_url && (
            <figure className="mb-12 rounded-2xl overflow-hidden border border-white/10 bg-white">
              <Image
                src={data.drive_url}
                alt={`Planta 2D — ${entry.h1}`}
                width={1600}
                height={1000}
                sizes="(max-width: 768px) 100vw, 896px"
                priority
                className="w-full h-auto"
              />
              <figcaption className="text-xs text-gray-600 p-3 bg-black/40 text-center">
                Planta 2D técnica — estudo preliminar OBRASNET
              </figcaption>
            </figure>
          )}

          {/* Preço destacado */}
          {data?.valor_total && (
            <section className="glass-card p-8 md:p-10 mb-12 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                Preço chave na mão — projecto real de referência
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                {formatEur(data.valor_total)}
              </div>
              {pricePerM2 && (
                <div className="text-sm text-gray-400">
                  {formatEur(pricePerM2)} por m² construído
                </div>
              )}
              {data.padrao_acabamento && (
                <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  {data.padrao_acabamento}
                </div>
              )}
              <p className="text-xs text-gray-600 mt-6 max-w-2xl mx-auto">
                * Valor indicativo baseado em orçamento real entregue ao cliente.
                O valor do seu projecto depende do terreno, acabamentos
                escolhidos e especificações específicas.
              </p>
            </section>
          )}

          <InlineCta searchIntent="comercial" />

          <PortfolioSpecs
            specs={{
              tipologia: data?.tipologia ?? entry.urlTipologia,
              area_m2: realArea,
              num_pisos: data?.num_pisos ?? null,
              tem_cave: data?.tem_cave ?? null,
              tem_sotao: data?.tem_sotao ?? null,
              padrao_acabamento: data?.padrao_acabamento ?? null,
            }}
          />

          {/* Sobre construção LSF (boilerplate E-E-A-T) */}
          <section className="glass-card p-8 md:p-10 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Sobre Construção LSF
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              {COMMON_BOILERPLATE.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Modelos relacionados */}
          {related.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-white mb-4">
                Outros Modelos de Referência
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/portfolio/${r.slug}`}
                    className="glass-card p-5 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-xs text-blue-400 uppercase tracking-wider mb-2">
                      {r.urlTipologia}
                      {r.urlAreaM2 ? ` · ${r.urlAreaM2} m²` : ""}
                    </div>
                    <div className="text-white font-bold text-sm mb-2">
                      {r.h1}
                    </div>
                    <div className="text-blue-400 text-sm inline-flex items-center gap-1">
                      Ver modelo <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <FaqSection faqs={COMMON_FAQS} />
          <AuthorSection />

          <div className="glass-card p-8 text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-3">
              Quer um modelo como este no seu terreno?
            </h2>
            <p className="text-gray-400 mb-6">
              Calcule em 2 minutos o custo para o seu terreno e tipologia
              específica.
            </p>
            <Link
              href="/simulador"
              className="btn-primary rounded-full px-10 py-4 font-bold inline-flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" /> Simular Custos Grátis
            </Link>
          </div>

          <WhatsAppCta titulo={entry.h1} />
        </div>
      </main>
    </>
  );
}
