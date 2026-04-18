import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { Calculator } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";
import AssistantLazy from "@/components/assistant/AssistantLazy";
import PortfolioSpecs from "@/components/PortfolioSpecs";
import PlantaGallery from "@/components/PlantaGallery";
import PdfDownloads from "@/components/PdfDownloads";
import { COMMON_FAQS, COMMON_BOILERPLATE } from "@/data/portfolio-map";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const SITE_URL = "https://casaslsf.com";

interface PlantaDetail {
  id: number;
  slug: string;
  tipologia: string | null;
  area_m2: number | null;
  num_pisos: number | null;
  tem_cave: boolean | null;
  tem_sotao: boolean | null;
  valor_total: number | null;
  valor_materiais: number | null;
  valor_mao_obra: number | null;
  valor_indiretos: number | null;
  valor_sem_iva: number | null;
  iva_percentual: number | null;
  iva_valor: number | null;
  preco_m2: number | null;
  bdi_percentual: number | null;
  padrao_acabamento: string | null;
  url: string;
  planta_2d_count: number;
  planta_2d_urls: string[];
  render_3d_count: number;
  render_3d_urls: string[];
  pdfs: Array<{ titulo: string; url: string; index: number }>;
}

function parseSlug(slug: string): { projetoId: number | null } {
  const m = slug.match(/-(\d+)$/);
  return { projetoId: m ? Number(m[1]) : null };
}

async function getPlantaDetail(projetoId: number): Promise<PlantaDetail | null> {
  try {
    const res = await fetch(`${API_URL}/api/plantas-publicas/${projetoId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  // Prebuild top 20 by valor_total
  try {
    const res = await fetch(`${API_URL}/api/plantas-publicas?limit=20`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || [])
      .filter((i: PlantaDetail) => i.tipologia)
      .map((i: PlantaDetail) => ({
        tipo: (i.tipologia as string).toLowerCase(),
        slug: i.slug,
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tipo: string; slug: string }>;
}): Promise<Metadata> {
  const { tipo, slug } = await params;
  const { projetoId } = parseSlug(slug);
  if (!projetoId) return { title: "Modelo não encontrado | Casas LSF" };

  const data = await getPlantaDetail(projetoId);
  if (!data) return { title: "Modelo não encontrado | Casas LSF" };

  const area = data.area_m2 ? `${Math.round(data.area_m2)}m²` : "";
  const upper = (data.tipologia || tipo).toUpperCase();
  const priceText = data.valor_total
    ? ` — desde ${Math.round(data.valor_total).toLocaleString("pt-PT")}€`
    : "";

  const title = `${upper} ${area} Chave na Mão${priceText} | Casas LSF`;
  const description = `Modelo ${upper} ${area} em Light Steel Framing. Planta 2D, visualização 3D, orçamento detalhado e especificações técnicas. ${data.padrao_acabamento ? data.padrao_acabamento + ". " : ""}Portugal 2026.`;

  return {
    title: title.slice(0, 66),
    description: description.slice(0, 160),
    alternates: {
      canonical: `${SITE_URL}/plantas/tipologia/${tipo}/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/plantas/tipologia/${tipo}/${slug}`,
      type: "website",
    },
  };
}

function formatEur(v: number | null): string {
  if (v === null || v === undefined) return "—";
  return v.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

export default async function PlantaDetailPage({
  params,
}: {
  params: Promise<{ tipo: string; slug: string }>;
}) {
  const { tipo, slug } = await params;
  const { projetoId } = parseSlug(slug);

  if (!projetoId) {
    permanentRedirect(`/plantas/tipologia/${tipo}`);
  }

  const data = await getPlantaDetail(projetoId);
  if (!data) {
    permanentRedirect(`/plantas/tipologia/${tipo}`);
  }

  // Tipology consistency guard — URL /t3/150m2-123 but data says t4 → redirect
  const dataTipo = (data.tipologia || "").toLowerCase();
  if (dataTipo && dataTipo !== tipo.toLowerCase()) {
    permanentRedirect(`/plantas/tipologia/${dataTipo}/${slug}`);
  }

  const upper = (data.tipologia || tipo).toUpperCase();
  const areaInt = data.area_m2 ? Math.round(data.area_m2) : 0;
  const h1 = `${upper} ${areaInt}m² Chave na Mão`;
  const pricePerM2 =
    data.valor_total && data.area_m2
      ? Math.round(data.valor_total / data.area_m2)
      : null;

  const breadcrumbs = [
    { label: "Início", href: "/" },
    { label: "Plantas", href: "/plantas" },
    { label: upper, href: `/plantas/tipologia/${tipo}` },
    { label: `${areaInt}m²` },
  ];

  // JSON-LD
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: h1,
    description: `Moradia ${upper} ${areaInt}m² em Light Steel Framing chave na mão.`,
    brand: { "@type": "Brand", name: "Casas LSF" },
    manufacturer: {
      "@type": "Organization",
      name: "OBRASNET UNIP LDA",
      url: SITE_URL,
    },
    category: "Construção Light Steel Framing",
    ...(data.valor_total
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: data.valor_total.toFixed(2),
            availability: "https://schema.org/InStock",
            priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
            seller: { "@type": "Organization", name: "OBRASNET UNIP LDA" },
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
        name: upper,
        item: `${SITE_URL}/plantas/tipologia/${tipo}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: h1,
        item: `${SITE_URL}/plantas/tipologia/${tipo}/${slug}`,
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
              Modelo Inspirado em Projecto Real
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              {h1}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              Modelo baseado em projecto real aprovado e orçamentado. Planta 2D,
              visualização 3D e orçamento detalhado abaixo.
            </p>
          </header>

          <AssistantLazy />

          <PlantaGallery
            planta2dUrls={data.planta_2d_urls}
            render3dUrls={data.render_3d_urls}
            modeloTitulo={h1}
            apiBase={API_URL}
          />

          {/* Preço destacado */}
          {data.valor_total && (
            <section className="glass-card p-8 md:p-10 mb-12 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                Preço chave na mão (c/ IVA) — referência real
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
            </section>
          )}

          {/* Breakdown */}
          {data.valor_materiais && data.valor_mao_obra && (
            <section className="glass-card p-8 md:p-10 mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                Detalhamento de Custos
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <span className="text-gray-300">Materiais</span>
                  <span className="text-white font-bold">
                    {formatEur(data.valor_materiais)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <span className="text-gray-300">Mão de obra</span>
                  <span className="text-white font-bold">
                    {formatEur(data.valor_mao_obra)}
                  </span>
                </div>
                {data.valor_indiretos !== null &&
                  data.valor_indiretos !== undefined && (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <span className="text-gray-300">Custos indirectos</span>
                      <span className="text-white font-bold">
                        {formatEur(data.valor_indiretos)}
                      </span>
                    </div>
                  )}
                {data.valor_sem_iva !== null &&
                  data.valor_sem_iva !== undefined && (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/10">
                      <span className="text-gray-200 font-semibold">
                        Subtotal (s/ IVA)
                      </span>
                      <span className="text-white font-bold">
                        {formatEur(data.valor_sem_iva)}
                      </span>
                    </div>
                  )}
                {data.iva_valor !== null && data.iva_valor !== undefined && (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <span className="text-gray-300">
                      IVA
                      {data.iva_percentual
                        ? ` (${Math.round(data.iva_percentual)}%)`
                        : ""}
                    </span>
                    <span className="text-white font-bold">
                      {formatEur(data.iva_valor)}
                    </span>
                  </div>
                )}
                {data.valor_total !== null && data.valor_total !== undefined && (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    <span className="text-white font-bold">
                      Total chave na mão (c/ IVA)
                    </span>
                    <span className="text-white font-black text-lg">
                      {formatEur(data.valor_total)}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-6 leading-relaxed">
                Valores de referência com base em projecto real orçamentado.
                IVA à taxa legal em vigor (23% construção por empreitada com
                OBRASNET UNIP LDA).
              </p>
            </section>
          )}

          {/* IVA 6% callout — mostra reembolso estimado */}
          {data.valor_sem_iva !== null &&
            data.valor_sem_iva !== undefined &&
            data.valor_sem_iva > 0 && (
              <section className="glass-card p-6 md:p-8 mb-12 border border-green-500/30 bg-green-500/5">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <div className="flex-1">
                    <div className="text-xs text-green-300 uppercase tracking-wider font-bold mb-2">
                      💡 Habitação Própria Permanente
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                      Recupere cerca de{" "}
                      {formatEur(Math.round(data.valor_sem_iva * 0.17))} junto
                      da Autoridade Tributária
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Ao abrigo da Lei n.º 9-A/2026, clientes em habitação
                      própria e permanente recebem reembolso de 17% (diferença
                      entre 23% e 6%) no prazo de 150 dias após a licença de
                      utilização.
                    </p>
                  </div>
                  <Link
                    href="/iva-6-construcao"
                    className="btn-primary rounded-full px-6 py-3 font-bold inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    Como funciona →
                  </Link>
                </div>
              </section>
            )}

          <InlineCta searchIntent="comercial" />

          <PortfolioSpecs
            specs={{
              tipologia: data.tipologia,
              area_m2: data.area_m2,
              num_pisos: data.num_pisos,
              tem_cave: data.tem_cave,
              tem_sotao: data.tem_sotao,
              padrao_acabamento: data.padrao_acabamento,
            }}
          />

          <PdfDownloads
            pdfs={data.pdfs}
            apiBase={API_URL}
            modeloTitulo={h1}
          />

          {/* Sobre LSF */}
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

          <FaqSection faqs={COMMON_FAQS} />
          <AuthorSection />

          <div className="glass-card p-8 text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-3">
              Quer um modelo como este no seu terreno?
            </h2>
            <p className="text-gray-400 mb-6">
              Calcule em 2 minutos o custo para a sua situação específica.
            </p>
            <Link
              href="/simulador"
              className="btn-primary rounded-full px-10 py-4 font-bold inline-flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" /> Simular Custos Grátis
            </Link>
          </div>

          <WhatsAppCta titulo={h1} />
        </div>
      </main>
    </>
  );
}
