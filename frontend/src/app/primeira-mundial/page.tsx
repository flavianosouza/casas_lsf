import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  CheckCircle,
  Github,
  MessageCircle,
  FileText,
  Sparkles,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Building2,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const PUBLISHED_DATE = "2026-04-29";
const PUBLISHED_DATE_HUMAN = "29 de Abril de 2026";
const CANONICAL_URL = "https://casaslsf.com/primeira-mundial";

export const metadata: Metadata = {
  title:
    "Primeira Mundial: Automação Completa de Vendas LSF com IA | OBRASNET",
  description:
    "Flaviano Silva de Souza criou em 2026 o primeiro sistema no mundo a gerar automaticamente plantas 2D LSF conformes com normas europeias, orçamentos e propostas de licenciamento numa única conversa WhatsApp.",
  alternates: { canonical: CANONICAL_URL },
  authors: [{ name: "Flaviano Silva de Souza" }],
  keywords: [
    "primeira mundial LSF automação",
    "plantas 2D LSF automáticas",
    "inteligência artificial construção",
    "pipeline vendas LSF WhatsApp",
    "Light Steel Frame IA Portugal",
    "normas europeias LSF automação",
    "EN 1993 planta automática",
    "Flaviano Silva de Souza",
    "OBRASNET LSF Intelligence AI",
  ],
  openGraph: {
    title: "Primeira Mundial: Pipeline LSF Automatizado com IA",
    description:
      "O primeiro sistema no mundo a gerar plantas 2D LSF + orçamento + licenciamento automaticamente via WhatsApp.",
    url: CANONICAL_URL,
    type: "article",
    publishedTime: `${PUBLISHED_DATE}T00:00:00Z`,
    authors: ["Flaviano Silva de Souza"],
    locale: "pt_PT",
    siteName: "CASAS LSF · OBRASNET",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primeira Mundial: Pipeline LSF Automatizado com IA",
    description:
      "Primeiro sistema no mundo a gerar plantas 2D LSF + orçamento + licenciamento automaticamente via WhatsApp. 29 Abril 2026.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Primeira Mundial LSF Intelligence AI" },
];

const inovacoes = [
  {
    icon: MessageCircle,
    titulo: "Pipeline End-to-End",
    descricao:
      "Primeira vez no mundo que uma conversa de WhatsApp gera automaticamente planta 2D + orçamento PDF + proposta de licenciamento, sem qualquer intervenção humana.",
  },
  {
    icon: FileText,
    titulo: "Plantas 2D com Normas Europeias",
    descricao:
      "Primeiro sistema a gerar automaticamente plantas arquitectónicas LSF que cumprem EN 1993-1-3 (Eurocódigo 3), prontas para submissão a licenciamento municipal em Portugal.",
  },
  {
    icon: Sparkles,
    titulo: "Orçamento Técnico por IA",
    descricao:
      "Primeiro orçamento LSF automatizado com 13 categorias construtivas e caderno de encargos técnico (norma CYPE), gerado em tempo real por inteligência artificial.",
  },
];

const pipelineEtapas = [
  {
    nome: "WhatsApp",
    desc: "Lead inicia contacto",
    icon: MessageCircle,
    color: "text-emerald-400",
  },
  {
    nome: "Agente IA",
    desc: "GPT-4o qualifica e dialoga",
    icon: Cpu,
    color: "text-blue-400",
  },
  {
    nome: "Planta 2D",
    desc: "Gemini 2.5 Flash + EN 1993",
    icon: FileText,
    color: "text-purple-400",
  },
  {
    nome: "Orçamento PDF",
    desc: "13 categorias + caderno encargos",
    icon: Sparkles,
    color: "text-amber-400",
  },
  {
    nome: "Licenciamento",
    desc: "Proposta IMPIC pronta",
    icon: ShieldCheck,
    color: "text-rose-400",
  },
  {
    nome: "Cliente",
    desc: "Recebe documentos completos",
    icon: CheckCircle,
    color: "text-green-400",
  },
];

const evidencias = [
  { item: "Sistema em produção desde", valor: "Abril 2026" },
  { item: "WhatsApp ativo", valor: "+351 930 423 456" },
  { item: "Leads reais processados", valor: "49+" },
  { item: "Conversas IA registadas", valor: "2.746+" },
  { item: "Plantas 2D geradas automaticamente", valor: "7+" },
  { item: "Workflows N8N ativos", valor: "7 principais" },
  {
    item: "Repositório GitHub",
    valor: "github.com/flavianosouza/LSF-Intelligence-AI",
    link: "https://github.com/flavianosouza/LSF-Intelligence-AI",
  },
  {
    item: "Commit histórico SHA",
    valor: "04bdbdaa3d4f70a5b1035472f5438be74186d202",
    mono: true,
  },
  { item: "Empresa registada", valor: "OBRASNET UNIP LDA · NIF 515 866 989" },
  { item: "Alvará IMPIC", valor: "94665-PAR" },
];

const stack = [
  "GPT-4o",
  "Gemini 2.5 Flash",
  "Gemini 2.0 Vision",
  "N8N",
  "Evolution API",
  "PostgreSQL",
  "Node.js MCP",
  "Cloudflare R2",
  "html2pdf",
  "Google Drive API",
  "Firecrawl",
];

const cronologia = [
  {
    data: "Abril 2026",
    titulo: "Sistema LSF Intelligence AI colocado em produção",
    estado: "concluido",
  },
  {
    data: "29 Abril 2026",
    titulo: "Registo histórico publicado nesta página",
    estado: "concluido",
  },
  {
    data: "A completar",
    titulo: "Depósito no Zenodo (DOI permanente)",
    estado: "pendente",
  },
  {
    data: "A completar",
    titulo: "Cobertura mediática",
    estado: "pendente",
  },
];

export default function PrimeiraMundialPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Primeira Mundial: Automação Completa de Vendas LSF com Inteligência Artificial",
    description:
      "Primeiro sistema no mundo a gerar automaticamente plantas 2D LSF conformes com normas europeias, orçamentos e propostas de licenciamento numa única conversa WhatsApp.",
    author: {
      "@type": "Person",
      name: "Flaviano Silva de Souza",
      affiliation: {
        "@type": "Organization",
        name: "OBRASNET UNIP LDA",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "OBRASNET UNIP LDA",
      legalName: "OBRASNET UNIP LDA",
      taxID: "515866989",
      address: {
        "@type": "PostalAddress",
        streetAddress: "R. Abade Faria 18, 1.o Dto",
        addressLocality: "Mem Martins, Sintra",
        postalCode: "2725-475",
        addressCountry: "PT",
      },
      identifier: [
        { "@type": "PropertyValue", propertyID: "NIF", value: "515866989" },
        {
          "@type": "PropertyValue",
          propertyID: "Alvará IMPIC",
          value: "94665-PAR",
        },
      ],
    },
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    url: CANONICAL_URL,
    mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL_URL },
    inLanguage: "pt-PT",
    about: [
      { "@type": "Thing", name: "Light Steel Framing" },
      { "@type": "Thing", name: "Inteligência Artificial" },
      { "@type": "Thing", name: "Automação Industrial" },
      { "@type": "Thing", name: "Eurocódigo EN 1993-1-3" },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: "https://casaslsf.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Primeira Mundial LSF Intelligence AI",
        item: CANONICAL_URL,
      },
    ],
  };

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

      <main className="min-h-screen bg-transparent">
        {/* Hero */}
        <section className="relative px-6 pt-32 pb-20 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(23,143,198,0.18), transparent 55%), radial-gradient(ellipse at bottom right, rgba(240,125,23,0.10), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(23,143,198,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,143,198,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="max-w-5xl mx-auto">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-semibold tracking-wide uppercase">
              <Award className="w-4 h-4" />
              Registo Histórico · Primeira Mundial
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Primeira Mundial:{" "}
              <span className="text-gradient">
                O Sistema que Automatizou a Venda de Casas LSF
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-3xl">
              Em 2026, <strong>Flaviano Silva de Souza</strong> criou o primeiro
              sistema no mundo a gerar automaticamente plantas 2D conformes com
              normas europeias, orçamentos e propostas de licenciamento — numa
              única conversa de WhatsApp.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <Calendar className="w-4 h-4" />
              <time dateTime={PUBLISHED_DATE} className="font-semibold text-slate-300">
                {PUBLISHED_DATE_HUMAN}
              </time>
              <span className="text-slate-600">·</span>
              <span>OBRASNET UNIP LDA · NIF 515 866 989</span>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#pipeline"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base"
              >
                Ver o pipeline <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/flavianosouza/LSF-Intelligence-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base"
              >
                <Github className="w-4 h-4" /> Verificar no GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Inovações */}
        <section className="px-6 py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-sm font-bold tracking-[0.2em] uppercase text-[#F07D17]">
              O Que Foi Realizado Pela Primeira Vez
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
              Três inovações combinadas, inéditas a nível mundial
            </h2>

            <div className="mt-12 grid md:grid-cols-3 gap-5">
              {inovacoes.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.titulo} className="glass-card p-7">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#178FC6]/30 to-[#178FC6]/5 border border-[#178FC6]/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#5bbde0]" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{card.titulo}</h3>
                    <p className="mt-3 text-slate-300/85 leading-relaxed text-[15px]">
                      {card.descricao}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pipeline diagram */}
        <section id="pipeline" className="px-6 py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-sm font-bold tracking-[0.2em] uppercase text-[#F07D17]">
              Como Funciona
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
              Pipeline end-to-end automatizado
            </h2>
            <p className="mt-4 text-slate-300/80 max-w-3xl">
              Cada conversa percorre todas as etapas sem intervenção humana. Os
              documentos finais são entregues directamente ao lead em formato
              PDF, prontos a usar.
            </p>

            <ol className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {pipelineEtapas.map((etapa, i) => {
                const Icon = etapa.icon;
                const isLast = i === pipelineEtapas.length - 1;
                return (
                  <li
                    key={etapa.nome}
                    className="relative glass-card p-5 flex flex-col gap-2"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${etapa.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-mono tracking-widest uppercase text-slate-500">
                      Etapa {i + 1}
                    </div>
                    <div className="text-base font-bold">{etapa.nome}</div>
                    <div className="text-xs text-slate-400 leading-snug">
                      {etapa.desc}
                    </div>
                    {!isLast && (
                      <ArrowRight
                        aria-hidden
                        className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Evidências */}
        <section className="px-6 py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-sm font-bold tracking-[0.2em] uppercase text-[#F07D17]">
              Evidências Técnicas
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
              Verificável e auditável
            </h2>
            <p className="mt-4 text-slate-300/80 max-w-3xl">
              Cada item abaixo é confirmável de forma independente: através do
              repositório público no GitHub, da base de dados do sistema em
              produção, ou dos registos públicos da empresa.
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-sm md:text-base">
                <tbody>
                  {evidencias.map((row, i) => (
                    <tr
                      key={row.item}
                      className={
                        i % 2 === 0
                          ? "bg-white/[0.015]"
                          : "bg-transparent"
                      }
                    >
                      <th
                        scope="row"
                        className="text-left font-medium text-slate-400 px-5 py-4 align-top w-1/2 md:w-2/5"
                      >
                        {row.item}
                      </th>
                      <td
                        className={`px-5 py-4 ${
                          row.mono ? "font-mono text-xs md:text-sm" : ""
                        } text-slate-100 break-all`}
                      >
                        {row.link ? (
                          <a
                            href={row.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#5bbde0] hover:text-[#7ccfe7] underline-offset-4 hover:underline"
                          >
                            {row.valor}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          row.valor
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="px-6 py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-sm font-bold tracking-[0.2em] uppercase text-[#F07D17]">
              Stack Tecnológico
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
              Tecnologias utilizadas
            </h2>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Quote do fundador */}
        <section className="px-6 py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <figure className="relative glass-card p-8 md:p-12 border-l-4 border-l-[#F07D17]">
              <div
                aria-hidden
                className="absolute top-4 left-6 text-7xl md:text-8xl font-serif text-[#178FC6]/25 leading-none select-none"
              >
                &ldquo;
              </div>
              <blockquote className="relative pl-8 md:pl-10 text-lg md:text-2xl leading-relaxed text-slate-100 font-medium">
                Desenvolvi este sistema combinando inteligência artificial,
                automação e conhecimento profundo da construção LSF e das normas
                europeias. Não existe outro sistema no mundo que realize
                automaticamente, numa única conversa, a geração de plantas 2D
                LSF conformes com normas europeias, orçamento profissional
                completo e proposta de licenciamento.
              </blockquote>
              <figcaption className="mt-8 pl-8 md:pl-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#178FC6] to-[#F07D17] flex items-center justify-center font-bold text-white text-lg shrink-0">
                  FS
                </div>
                <div>
                  <div className="font-bold text-base">
                    Flaviano Silva de Souza
                  </div>
                  <div className="text-sm text-slate-400">
                    Fundador OBRASNET · {PUBLISHED_DATE_HUMAN}
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Cronologia */}
        <section className="px-6 py-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <div className="text-sm font-bold tracking-[0.2em] uppercase text-[#F07D17]">
              Cronologia
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
              Marcos do registo
            </h2>

            <ol className="mt-10 relative border-l border-white/10 pl-8 space-y-8">
              {cronologia.map((m) => {
                const isDone = m.estado === "concluido";
                return (
                  <li key={m.titulo} className="relative">
                    <span
                      aria-hidden
                      className={`absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 ${
                        isDone
                          ? "bg-[#22c55e] border-[#22c55e] shadow-[0_0_0_4px_rgba(34,197,94,0.15)]"
                          : "bg-transparent border-slate-500"
                      }`}
                    />
                    <div className="text-xs font-mono uppercase tracking-widest text-[#F07D17]">
                      {m.data}
                    </div>
                    <div className="mt-1 text-base font-semibold text-slate-100">
                      {m.titulo}
                    </div>
                    {!isDone && (
                      <div className="mt-1 text-xs text-slate-500 italic">
                        Pendente
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Footer institucional */}
        <section className="px-6 py-16 border-t border-white/10 bg-white/[0.015]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 text-[#F07D17]">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-[0.2em]">
                Identificação Legal
              </span>
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-8 text-sm text-slate-300 leading-relaxed">
              <div>
                <div className="font-bold text-slate-100 mb-1">
                  OBRASNET UNIP LDA
                </div>
                <div>NIF 515 866 989</div>
                <div>Alvará IMPIC 94665-PAR</div>
              </div>
              <div>
                <div className="font-bold text-slate-100 mb-1">Sede</div>
                <div>R. Abade Faria 18, 1.º Dto</div>
                <div>2725-475 Mem Martins · Sintra · Portugal</div>
              </div>
              <div>
                <div className="font-bold text-slate-100 mb-1">Contactos</div>
                <div>
                  <a
                    href="mailto:orcamento@casaslsf.com"
                    className="text-[#5bbde0] hover:underline"
                  >
                    orcamento@casaslsf.com
                  </a>
                </div>
                <div>+351 930 423 456</div>
              </div>
              <div>
                <div className="font-bold text-slate-100 mb-1">Web</div>
                <Link
                  href="/"
                  className="text-[#5bbde0] hover:underline"
                >
                  casaslsf.com
                </Link>
              </div>
            </div>
            <p className="mt-10 text-xs text-slate-500 max-w-3xl leading-relaxed">
              Esta página constitui registo histórico permanente publicado em{" "}
              {PUBLISHED_DATE_HUMAN}. Conteúdo factual e verificável, baseado em
              evidências do sistema em produção.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
