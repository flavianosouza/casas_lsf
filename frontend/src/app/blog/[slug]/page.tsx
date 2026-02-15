import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://casas-lsf-backend.dy3pb5.easypanel.host";
const SITE_URL = "https://casaslsf.com";

interface Artigo {
  id: string;
  titulo: string;
  slug: string;
  conteudo_html: string;
  resumo: string | null;
  categoria: string | null;
  autor: string;
  tags: string[] | null;
  imagem_destaque_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  status: string;
}

async function getArtigo(slug: string): Promise<Artigo | null> {
  const res = await fetch(`${API_URL}/api/artigos/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigo(slug);

  if (!artigo) {
    return { title: "Artigo nao encontrado | Casas LSF" };
  }

  const title = artigo.meta_title || `${artigo.titulo} | Casas LSF`;
  const description =
    artigo.meta_description || artigo.resumo || "Artigo sobre construcao LSF em Portugal.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${artigo.slug}`,
      siteName: "Casas LSF",
      type: "article",
      publishedTime: artigo.published_at || undefined,
      authors: [artigo.autor],
      images: artigo.imagem_destaque_url
        ? [{ url: artigo.imagem_destaque_url, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${artigo.slug}`,
    },
  };
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  const minutes = Math.max(3, Math.ceil(words / 200));
  return `${minutes} min`;
}

const CATEGORIAS_LABELS: Record<string, string> = {
  construcao: "Construcao LSF",
  financiamento: "Financiamento",
  terrenos: "Terrenos",
  dicas: "Dicas",
  noticias: "Noticias",
};

export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artigo = await getArtigo(slug);

  if (!artigo) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.titulo,
    description: artigo.resumo || "",
    author: {
      "@type": "Organization",
      name: artigo.autor,
    },
    publisher: {
      "@type": "Organization",
      name: "OBRASNET UNIP LDA",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: artigo.published_at || artigo.created_at,
    dateModified: artigo.published_at || artigo.created_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${artigo.slug}`,
    },
    image: artigo.imagem_destaque_url || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover py-32 px-6">
        <article className="container mx-auto max-w-3xl">
          {/* Voltar */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
          </Link>

          {/* Cabecalho */}
          <header className="mb-12 animate-fade-in">
            {artigo.categoria && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-6">
                <Tag className="w-3 h-3" />
                {CATEGORIAS_LABELS[artigo.categoria] || artigo.categoria}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {artigo.titulo}
            </h1>
            {artigo.resumo && (
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                {artigo.resumo}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> {artigo.autor}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {formatDate(artigo.published_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {estimateReadTime(artigo.conteudo_html)} de leitura
              </span>
            </div>
          </header>

          {/* Imagem de destaque */}
          {artigo.imagem_destaque_url && (
            <div className="w-full rounded-2xl overflow-hidden mb-12 animate-fade-in">
              <img
                src={artigo.imagem_destaque_url}
                alt={artigo.titulo}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Conteudo */}
          <div
            className="prose prose-invert prose-lg max-w-none mb-16 animate-fade-in
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-strong:text-white
              prose-ul:text-gray-300 prose-ol:text-gray-300
              prose-li:marker:text-blue-500
              prose-blockquote:border-blue-500 prose-blockquote:text-gray-400
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: artigo.conteudo_html }}
          />

          {/* Tags */}
          {artigo.tags && artigo.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-white/10">
              {artigo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="glass-card p-10 text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-4">
              Quer construir a sua casa em LSF?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Simule o custo da sua casa em menos de 2 minutos. Sem compromisso,
              100% gratuito.
            </p>
            <Link
              href="/simulador"
              className="btn-primary rounded-full px-10 py-4 text-lg font-bold inline-flex items-center gap-3"
            >
              Simular Gratis <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
