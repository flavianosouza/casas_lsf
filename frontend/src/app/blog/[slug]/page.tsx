import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Tag, User } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";
import RelatedArticles from "@/components/RelatedArticles";
import GerarEstudoButton from "@/components/GerarEstudoButton";
import AssistantLazy from "@/components/assistant/AssistantLazy";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://casas-lsf-backend.dy3pb5.easypanel.host";
const SITE_URL = "https://casaslsf.com";

interface FaqItem {
  pergunta: string;
  resposta: string;
}

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
  imagem_alt_text: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  status: string;
  faq_json: FaqItem[] | null;
  search_intent: string | null;
  read_time_minutes: number | null;
}

async function getArtigo(slug: string): Promise<Artigo | null> {
  const res = await fetch(`${API_URL}/api/artigos/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  return res.json();
}

interface RelatedArticle {
  slug: string;
  titulo: string;
  categoria: string;
  resumo?: string;
}

async function getRelatedArticles(slug: string): Promise<RelatedArticle[]> {
  try {
    const res = await fetch(`${API_URL}/api/artigos/related/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigo(slug);

  if (!artigo) {
    return { title: "Artigo não encontrado | Casas LSF" };
  }

  const title = artigo.meta_title || `${artigo.titulo} | Casas LSF`;
  const description =
    artigo.meta_description || artigo.resumo || "Artigo sobre construção LSF em Portugal.";

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
      modifiedTime: artigo.updated_at || artigo.published_at || undefined,
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

function getReadTime(artigo: Artigo): string {
  if (artigo.read_time_minutes) return `${artigo.read_time_minutes} min`;
  const text = artigo.conteudo_html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  return `${Math.max(3, Math.ceil(words / 200))} min`;
}

function normalizeHtml(html: string): string {
  // WordPress imports may have unwrapped text after headings.
  // Wrap loose text nodes between block elements in <p> tags.
  return html
    .replace(/(<\/h[2-6]>)\s*(?!<)([\s\S]*?)(?=<h[2-6]|<p|<ul|<ol|<blockquote|<div|<table|<figure|$)/gi,
      (_, close, text) => {
        const trimmed = text.trim();
        if (!trimmed) return close;
        // Split on double line breaks into paragraphs
        const paragraphs = trimmed
          .split(/\n\s*\n/)
          .map((p: string) => p.trim())
          .filter(Boolean)
          .map((p: string) => (p.startsWith("<") ? p : `<p>${p}</p>`))
          .join("\n");
        return `${close}\n${paragraphs}`;
      }
    );
}

function getWordCount(html: string): number {
  return html.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
}

function splitContentAfterParagraph(html: string, n: number): [string, string] {
  let count = 0;
  const regex = /<\/p>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    count++;
    if (count === n) {
      const splitIndex = match.index + match[0].length;
      return [html.substring(0, splitIndex), html.substring(splitIndex)];
    }
  }
  return [html, ""];
}

const CATEGORIAS_LABELS: Record<string, string> = {
  "construcao-lsf": "Construção LSF",
  "precos-construcao": "Preços de Construção",
  "casas-modulares": "Casas Modulares",
  "credito-habitacao": "Crédito Habitação",
  "dicas-construcao": "Dicas de Construção",
  remodelacao: "Remodelação",
  "terrenos-licencas": "Terrenos e Licenças",
  "icf-plastbau": "Construção ICF",
  acabamentos: "Acabamentos",
  "telhados-coberturas": "Telhados e Coberturas",
  betao: "Construção em Betão",
  isolamento: "Isolamento",
  "pavilhoes-garagens": "Pavilhões e Garagens",
  "casas-madeira": "Casas de Madeira",
};

const PROSE_CLASSES = `prose prose-invert prose-lg max-w-none
  prose-headings:text-white prose-headings:font-bold
  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
  prose-p:text-gray-300 prose-p:leading-relaxed
  prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
  prose-strong:text-white
  prose-ul:text-gray-300 prose-ol:text-gray-300
  prose-li:marker:text-blue-500
  prose-blockquote:border-blue-500 prose-blockquote:text-gray-400
  prose-img:rounded-xl`;

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

  const relatedArticles = await getRelatedArticles(slug);

  const categoriaLabel = artigo.categoria
    ? CATEGORIAS_LABELS[artigo.categoria] || artigo.categoria
    : null;

  const normalizedHtml = normalizeHtml(artigo.conteudo_html);
  const wordCount = getWordCount(normalizedHtml);
  const [contentPart1, contentPart2] = splitContentAfterParagraph(normalizedHtml, 2);

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.titulo,
    description: artigo.resumo || "",
    wordCount,
    articleSection: categoriaLabel || "Construção LSF",
    keywords: artigo.tags?.join(", ") || undefined,
    author: {
      "@type": "Organization",
      name: "OBRASNET UNIP LDA",
      url: SITE_URL,
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
    dateModified: artigo.updated_at || artigo.published_at || artigo.created_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${artigo.slug}`,
    },
    image: artigo.imagem_destaque_url || undefined,
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      ...(categoriaLabel
        ? [{ "@type": "ListItem", position: 3, name: categoriaLabel, item: `${SITE_URL}/blog?categoria=${artigo.categoria}` }]
        : []),
      { "@type": "ListItem", position: categoriaLabel ? 4 : 3, name: artigo.titulo },
    ],
  };

  // FAQ JSON-LD
  const faqJsonLd = artigo.faq_json?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: artigo.faq_json.map((faq) => ({
          "@type": "Question",
          name: faq.pergunta,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.resposta,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <main className="min-h-screen bg-[url('/bg-grid.svg')] bg-fixed bg-cover py-32 px-6">
        <article className="container mx-auto max-w-3xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              ...(categoriaLabel
                ? [{ label: categoriaLabel, href: `/blog?categoria=${artigo.categoria}` }]
                : []),
              { label: artigo.titulo },
            ]}
          />

          {/* Header */}
          <header className="mb-12 animate-fade-in">
            {categoriaLabel && (
              <Link
                href={`/blog?categoria=${artigo.categoria}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-6 hover:bg-blue-500/20 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {categoriaLabel}
              </Link>
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
                <Clock className="w-4 h-4" /> {getReadTime(artigo)} de leitura
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {artigo.imagem_destaque_url && (
            <div className="w-full rounded-2xl overflow-hidden mb-12 animate-fade-in">
              {artigo.imagem_destaque_url.includes("media.casaslsf.com") ? (
                <Image
                  src={artigo.imagem_destaque_url}
                  alt={artigo.imagem_alt_text || artigo.titulo}
                  width={1200}
                  height={630}
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="w-full h-auto object-cover"
                />
              ) : (
                <img
                  src={artigo.imagem_destaque_url}
                  alt={artigo.imagem_alt_text || artigo.titulo}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
          )}

          {/* Content Part 1 */}
          <div
            className={`${PROSE_CLASSES} mb-0 animate-fade-in`}
            dangerouslySetInnerHTML={{ __html: contentPart1 }}
          />

          {/* Inline CTA (after 2nd paragraph) */}
          {contentPart2 && (
            <InlineCta searchIntent={artigo.search_intent} />
          )}

          {/* Content Part 2 */}
          {contentPart2 && (
            <div
              className={`${PROSE_CLASSES} mb-16 animate-fade-in`}
              dangerouslySetInnerHTML={{ __html: contentPart2 }}
            />
          )}

          {/* If no split happened, add spacing */}
          {!contentPart2 && <div className="mb-16" />}

          <AssistantLazy />

          {/* FAQ Section */}
          {artigo.faq_json && artigo.faq_json.length > 0 && (
            <FaqSection faqs={artigo.faq_json} />
          )}

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

          {/* Author Section (E-E-A-T) */}
          <AuthorSection />

          {/* Related Articles */}
          <RelatedArticles articles={relatedArticles} />

          {/* Gerar Estudo Técnico (transactional articles) */}
          {artigo.search_intent === "transacional" && <GerarEstudoButton />}

          {/* Main CTA */}
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
              Simular Grátis <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* WhatsApp CTA */}
          <WhatsAppCta articleTitle={artigo.titulo} />
        </article>
      </main>
    </>
  );
}
