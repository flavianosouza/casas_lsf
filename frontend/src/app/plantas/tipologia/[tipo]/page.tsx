import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const SITE_URL = "https://casaslsf.com";

const VALID_TIPOS = ["t1", "t2", "t3", "t4"] as const;
type Tipo = (typeof VALID_TIPOS)[number];

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

async function listPlantas(tipo: string): Promise<{ items: PlantaItem[]; total: number }> {
  try {
    const res = await fetch(
      `${API_URL}/api/plantas-publicas?tipologia=${tipo.toUpperCase()}&limit=50`,
      { next: { revalidate: 600 } },
    );
    if (!res.ok) return { items: [], total: 0 };
    return res.json();
  } catch {
    return { items: [], total: 0 };
  }
}

export async function generateStaticParams() {
  return VALID_TIPOS.map((tipo) => ({ tipo }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tipo: string }>;
}): Promise<Metadata> {
  const { tipo } = await params;
  const upper = tipo.toUpperCase();
  const { total } = await listPlantas(tipo);

  const title = `Plantas de Casas LSF Tipologia ${upper} | ${total} Modelos | Casas LSF`;
  const description = `${total} plantas de moradias ${upper} em Light Steel Framing chave na mão em Portugal. Preços reais, especificações técnicas, orçamentos detalhados.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/plantas/tipologia/${tipo}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/plantas/tipologia/${tipo}`,
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

export default async function TipologiaPage({
  params,
}: {
  params: Promise<{ tipo: string }>;
}) {
  const { tipo } = await params;

  if (!VALID_TIPOS.includes(tipo as Tipo)) {
    notFound();
  }

  const upper = tipo.toUpperCase();
  const { items, total } = await listPlantas(tipo);

  const breadcrumbs = [
    { label: "Início", href: "/" },
    { label: "Plantas", href: "/plantas" },
    { label: `Tipologia ${upper}` },
  ];

  return (
    <main className="min-h-screen bg-transparent py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-12 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Catálogo {upper}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
            Plantas LSF Tipologia{" "}
            <span className="text-gradient">{upper}</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
            {total > 0 ? (
              <>
                <strong className="text-white">{total}</strong> modelos de
                moradia {upper} em Light Steel Framing — plantas técnicas, preços
                reais e orçamentos detalhados.
              </>
            ) : (
              "Nenhum modelo publicado de momento para esta tipologia."
            )}
          </p>
        </header>

        {/* Filter chips para outras tipologias */}
        <div className="flex flex-wrap gap-2 mb-10">
          {VALID_TIPOS.map((t) => (
            <Link
              key={t}
              href={`/plantas/tipologia/${t}`}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                t === tipo
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
              }`}
            >
              {t.toUpperCase()}
            </Link>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-gray-400">
              Ainda não há modelos {upper} publicados. Veja a{" "}
              <Link
                href="/plantas"
                className="text-blue-400 hover:text-blue-300"
              >
                listagem geral
              </Link>{" "}
              ou use o{" "}
              <Link
                href="/simulador"
                className="text-blue-400 hover:text-blue-300"
              >
                simulador
              </Link>{" "}
              para receber um modelo personalizado.
            </p>
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
                    alt={`${item.tipologia} ${item.area_m2}m²`}
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
