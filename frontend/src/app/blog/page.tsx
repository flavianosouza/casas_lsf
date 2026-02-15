import Link from "next/link";
import { ArrowRight, BookOpen, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Casas LSF - Artigos sobre Construcao em Aco Leve",
  description:
    "Artigos tecnicos, guias e novidades sobre construcao LSF em Portugal. Custos, financiamento, terrenos e dicas para a sua casa em Light Steel Framing.",
  openGraph: {
    title: "Blog | Casas LSF",
    description:
      "Artigos tecnicos sobre construcao LSF em Portugal.",
    url: "https://casaslsf.com/blog",
    siteName: "Casas LSF",
    type: "website",
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://casas-lsf-backend.dy3pb5.easypanel.host";

interface Artigo {
  id: string;
  titulo: string;
  slug: string;
  resumo: string | null;
  categoria: string | null;
  autor: string;
  tags: string[] | null;
  imagem_destaque_url: string | null;
  published_at: string | null;
  created_at: string;
}

interface ArtigosPaginados {
  artigos: Artigo[];
  total: number;
  pagina: number;
  por_pagina: number;
}

interface Categoria {
  categoria: string;
  total: number;
}

async function getArtigos(pagina = 1, categoria?: string): Promise<ArtigosPaginados> {
  const params = new URLSearchParams({
    pagina: pagina.toString(),
    por_pagina: "12",
  });
  if (categoria) params.set("categoria", categoria);

  const res = await fetch(`${API_URL}/api/artigos/?${params}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return { artigos: [], total: 0, pagina: 1, por_pagina: 12 };
  }
  return res.json();
}

async function getCategorias(): Promise<Categoria[]> {
  const res = await fetch(`${API_URL}/api/artigos/categorias`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function estimateReadTime(resumo: string | null): string {
  if (!resumo) return "3 min";
  const words = resumo.split(/\s+/).length;
  const minutes = Math.max(3, Math.ceil(words / 40));
  return `${minutes} min`;
}

const CATEGORIAS_LABELS: Record<string, string> = {
  construcao: "Construcao LSF",
  financiamento: "Financiamento",
  terrenos: "Terrenos",
  dicas: "Dicas",
  noticias: "Noticias",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string; categoria?: string }>;
}) {
  const params = await searchParams;
  const pagina = Number(params.pagina) || 1;
  const categoriaFiltro = params.categoria || undefined;

  const [data, categorias] = await Promise.all([
    getArtigos(pagina, categoriaFiltro),
    getCategorias(),
  ]);

  const totalPaginas = Math.ceil(data.total / data.por_pagina);

  return (
    <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" /> Blog & Noticias
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Conhecimento LSF
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Artigos tecnicos, guias e novidades sobre o mundo da construcao
            sustentavel.
          </p>
        </div>

        {/* Filtro por categoria */}
        {categorias.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-12 animate-fade-in">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !categoriaFiltro
                  ? "bg-blue-500 text-white"
                  : "border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              Todos
            </Link>
            {categorias.map((cat) => (
              <Link
                key={cat.categoria}
                href={`/blog?categoria=${cat.categoria}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  categoriaFiltro === cat.categoria
                    ? "bg-blue-500 text-white"
                    : "border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }`}
              >
                {CATEGORIAS_LABELS[cat.categoria] || cat.categoria} ({cat.total})
              </Link>
            ))}
          </div>
        )}

        {/* Grid de artigos */}
        {data.artigos.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-in">
            {data.artigos.map((artigo) => (
              <Link
                key={artigo.id}
                href={`/blog/${artigo.slug}`}
                className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300 flex flex-col group"
              >
                {artigo.imagem_destaque_url && (
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-6 bg-white/5">
                    <img
                      src={artigo.imagem_destaque_url}
                      alt={artigo.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  {artigo.categoria && (
                    <span className="inline-flex items-center gap-1 text-xs text-blue-400 font-medium">
                      <Tag className="w-3 h-3" />
                      {CATEGORIAS_LABELS[artigo.categoria] || artigo.categoria}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 font-mono">
                    {formatDate(artigo.published_at)} &bull;{" "}
                    {estimateReadTime(artigo.resumo)} leitura
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {artigo.titulo}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-1">
                  {artigo.resumo}
                </p>
                <div className="text-white text-sm font-medium flex items-center gap-2 mt-auto">
                  Ler Artigo{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-gray-500 text-lg mb-4">
              Ainda nao ha artigos publicados
              {categoriaFiltro ? " nesta categoria" : ""}.
            </p>
            {categoriaFiltro && (
              <Link
                href="/blog"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ver todos os artigos
              </Link>
            )}
          </div>
        )}

        {/* Paginacao */}
        {totalPaginas > 1 && (
          <div className="flex justify-center gap-3 mb-16">
            {pagina > 1 && (
              <Link
                href={`/blog?pagina=${pagina - 1}${categoriaFiltro ? `&categoria=${categoriaFiltro}` : ""}`}
                className="px-5 py-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm"
              >
                Anterior
              </Link>
            )}
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?pagina=${p}${categoriaFiltro ? `&categoria=${categoriaFiltro}` : ""}`}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  p === pagina
                    ? "bg-blue-500 text-white"
                    : "border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }`}
              >
                {p}
              </Link>
            ))}
            {pagina < totalPaginas && (
              <Link
                href={`/blog?pagina=${pagina + 1}${categoriaFiltro ? `&categoria=${categoriaFiltro}` : ""}`}
                className="px-5 py-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm"
              >
                Seguinte
              </Link>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="glass-card p-12 text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-4">
            Pronto para construir a sua casa LSF?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Simule o custo da sua casa em menos de 2 minutos.
            Sem compromisso, 100% gratuito.
          </p>
          <Link
            href="/simulador"
            className="btn-primary rounded-full px-10 py-4 text-lg font-bold inline-flex items-center gap-3"
          >
            Simular Gratis <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
