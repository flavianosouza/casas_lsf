import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Calculator } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const SITE_URL = "https://casaslsf.com";

export const metadata: Metadata = {
  title: "Plantas de Casas LSF — Modelos Chave na Mão | Casas LSF",
  description:
    "Plantas 2D, renders 3D e orçamentos reais de moradias em Light Steel Framing. Catálogo de modelos T1 a T4+ com preços chave na mão. Portugal 2026.",
  keywords: [
    "plantas casas LSF",
    "plantas LSF chave na mão",
    "planta casa modular",
    "modelos casas LSF",
    "plantas casas pré-fabricadas",
    "casa T2 LSF",
    "casa T3 LSF",
    "moradia T4 LSF",
  ],
  openGraph: {
    title: "Plantas de Casas LSF — Modelos Chave na Mão",
    description:
      "Catálogo público de plantas reais em Light Steel Framing, com preços, 3D e PDFs.",
    url: `${SITE_URL}/plantas`,
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/plantas` },
};

interface PlantaItem {
  id: number;
  tipologia: string;
  area_m2: number | null;
  num_pisos: number | null;
  valor_total: number | null;
  padrao_acabamento: string | null;
  slug: string;
  url: string;
  thumbnail_url: string;
}

async function listPlantas(): Promise<{ items: PlantaItem[]; total: number }> {
  try {
    const res = await fetch(`${API_URL}/api/plantas-publicas?limit=24`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return { items: [], total: 0 };
    return res.json();
  } catch {
    return { items: [], total: 0 };
  }
}

function formatEur(v: number | null): string {
  if (v === null || v === undefined) return "—";
  return v.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

const TIPOLOGIAS = [
  { slug: "t1", label: "T1" },
  { slug: "t2", label: "T2" },
  { slug: "t3", label: "T3" },
  { slug: "t4", label: "T4" },
];

export default async function PlantasPage() {
  const { items, total } = await listPlantas();

  return (
    <main className="min-h-screen bg-transparent py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 animate-fade-in max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Catálogo de Modelos
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-white">
            Plantas <span className="text-gradient">LSF Reais</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Modelos de moradias em Light Steel Framing com planta 2D, visualização
            3D, orçamento detalhado e documentação técnica.
            {total > 0 && (
              <>
                {" "}
                <strong className="text-white">{total}</strong> modelos
                publicados.
              </>
            )}
          </p>
        </header>

        {/* Filtros por tipologia */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="text-sm text-gray-500 font-bold uppercase tracking-wider mr-2">
            Filtrar por:
          </span>
          {TIPOLOGIAS.map((t) => (
            <Link
              key={t.slug}
              href={`/plantas/tipologia/${t.slug}`}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white/5 text-gray-300 border border-white/10 hover:bg-blue-500 hover:text-white transition-colors"
            >
              {t.label}
            </Link>
          ))}
          <Link
            href="/simulador"
            className="inline-flex items-center gap-2 ml-auto px-6 py-2 rounded-full bg-blue-500 text-white text-sm font-bold hover:bg-blue-400 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Gerar Planta IA
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-gray-400 mb-4">
              Catálogo a carregar. Enquanto isso, use o simulador para receber um
              modelo personalizado em 48h.
            </p>
            <Link
              href="/simulador"
              className="btn-primary rounded-full px-8 py-3 font-bold inline-flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" /> Simular Grátis
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="glass-card overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <div className="aspect-video bg-white relative overflow-hidden">
                  <Image
                    src={`${API_URL}${item.thumbnail_url}`}
                    alt={`Planta ${item.tipologia} ${item.area_m2}m²`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-blue-400 uppercase tracking-wider font-bold">
                      {item.tipologia}
                      {item.area_m2 ? ` · ${Math.round(item.area_m2)} m²` : ""}
                    </span>
                    {item.num_pisos !== null && (
                      <span className="text-xs text-gray-500">
                        {item.num_pisos}
                        {item.num_pisos === 1 ? " piso" : " pisos"}
                      </span>
                    )}
                  </div>
                  <div className="text-white font-bold text-lg mb-1">
                    {item.tipologia} {Math.round(item.area_m2 || 0)}m² Chave na
                    Mão
                  </div>
                  <div className="text-xl font-black text-white mb-1">
                    {formatEur(item.valor_total)}
                  </div>
                  {item.padrao_acabamento && (
                    <div className="text-xs text-gray-500 mt-2">
                      {item.padrao_acabamento}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
