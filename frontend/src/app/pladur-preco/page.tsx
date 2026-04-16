import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Layers, Ruler, Paintbrush, Wrench, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";
import AssistantLazy from "@/components/assistant/AssistantLazy";

export const metadata: Metadata = {
  title: "Pladur Preço m² em Portugal 2026 | Instalado e Pintado",
  description:
    "Preço do pladur por m² em 2026: de 4,50€ (só placa) a 35€/m² instalado e pintado. Tabela por tipo: divisória, tecto falso, hidrófuga, corta-fogo. Com e sem isolamento.",
  keywords: [
    "pladur preço", "pladur preço m2", "preço pladur m2 instalado",
    "pladur m2 mão de obra", "pladur preço m2 instalado e pintado",
    "preço pladur m2 2026", "pladur com isolamento preço", "gesso cartonado preço",
  ],
  alternates: { canonical: "https://casaslsf.com/pladur-preco" },
  openGraph: {
    title: "Pladur Preço m² em Portugal 2026 | Tabela Completa",
    description: "Tabela atualizada: 4,50€ a 35€/m² instalado e pintado. Divisórias, tectos, hidrófugo, corta-fogo, com isolamento.",
    url: "https://casaslsf.com/pladur-preco",
    type: "article",
  },
};

const faqs = [
  {
    pergunta: "Quanto custa pladur por m² instalado e pintado em 2026?",
    resposta:
      "Em 2026, pladur instalado e pintado custa entre 20€ e 35€ por m² em Portugal continental. O valor varia conforme o tipo de placa (standard, hidrófuga, corta-fogo) e o acabamento final (Q2 a Q5). Este preço inclui estrutura metálica, montagem, rematamento de juntas, primário e duas demãos de tinta.",
  },
  {
    pergunta: "Qual o preço do pladur por m² só mão de obra?",
    resposta:
      "A mão de obra para instalação de pladur custa entre 8€ e 14€ por m² em Portugal, excluindo material. Inclui montagem da estrutura, aplicação das placas, rematamento de juntas e lixagem. Não inclui isolamento, pintura, placa especial (hidrófuga/corta-fogo) nem remates com rodapés ou aros.",
  },
  {
    pergunta: "Pladur hidrófugo é mais caro?",
    resposta:
      "Sim. As placas hidrófugas (verdes), usadas em cozinhas e casas de banho, custam cerca de 30 a 40% mais que a placa standard. As corta-fogo (rosa) custam 25 a 35% mais. Num orçamento de 22€/m² standard, equivale a 28-30€/m² hidrófugo ou 27-29€/m² corta-fogo.",
  },
  {
    pergunta: "Quantos m² de pladur se instalam por dia?",
    resposta:
      "Um instalador experiente executa 15 a 25 m² de parede divisória simples por dia, ou 10 a 15 m² em tecto falso. Com rematamento Q3 (pintável) o rendimento baixa para 10-15 m²/dia. Acabamentos Q4/Q5 (luz rasante) exigem mais demãos e reduzem para 6-10 m²/dia.",
  },
  {
    pergunta: "O pladur serve como parede exterior?",
    resposta:
      "Não. O pladur é sempre revestimento interior. Em construção LSF, aplica-se do lado interior da parede estrutural, com ETICS ou fachada ventilada no exterior. Nunca usar pladur standard em zonas húmidas sem protecção: mesmo o hidrófugo requer barreira de vapor e acabamento cerâmico em duches.",
  },
];

const tabelaPrecos = [
  { tipo: "Parede divisória simples (13mm, estrutura 48mm)", material: "6 - 9€", instalado: "14 - 20€", pintado: "20 - 28€" },
  { tipo: "Parede com isolamento acústico (lã mineral)", material: "9 - 13€", instalado: "18 - 25€", pintado: "24 - 32€" },
  { tipo: "Parede hidrófuga (cozinha, casa de banho)", material: "10 - 14€", instalado: "20 - 28€", pintado: "28 - 38€" },
  { tipo: "Parede corta-fogo (RF 30/60/90)", material: "9 - 13€", instalado: "19 - 27€", pintado: "26 - 36€" },
  { tipo: "Tecto falso liso", material: "7 - 10€", instalado: "16 - 22€", pintado: "22 - 30€" },
  { tipo: "Tecto falso com iluminação embutida", material: "9 - 13€", instalado: "22 - 30€", pintado: "30 - 42€" },
];

const comparativo = [
  { metodo: "Pladur (gesso cartonado)", preco: "20 - 35€/m²", tempo: "1 dia / 10m²", peso: "~25 kg/m²", destaque: true },
  { metodo: "Tijolo furado + reboco", preco: "35 - 55€/m²", tempo: "3-4 dias / 10m²", peso: "~180 kg/m²", destaque: false },
  { metodo: "OSB revestido", preco: "28 - 45€/m²", tempo: "1-2 dias / 10m²", peso: "~35 kg/m²", destaque: false },
  { metodo: "Pladur + LSF estrutural", preco: "45 - 75€/m²", tempo: "2 dias / 10m²", peso: "~40 kg/m²", destaque: false },
];

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Pladur Preço m²" },
];

export default function PladurPrecoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pladur Preço m² em Portugal 2026 — Tabela Completa",
    description: "Tabela atualizada de preços do pladur por m² em Portugal: material, instalado e pintado. Divisórias, tectos, hidrófugo, corta-fogo, com isolamento.",
    url: "https://casaslsf.com/pladur-preco",
    author: { "@type": "Organization", name: "OBRASNET UNIP LDA" },
    publisher: { "@type": "Organization", name: "Casas LSF", url: "https://casaslsf.com" },
    articleSection: "Preços Construção",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-transparent py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mb-16 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Tabela de Preços 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              Pladur Preço{" "}
              <span className="text-gradient">por m² instalado</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              Preço do pladur em Portugal em 2026: desde 4,50€/m² só para a placa até
              35€/m² instalado e pintado. Tabela completa por tipo de aplicação,
              material e acabamento.
            </p>
          </header>

          <AssistantLazy />

          {/* Resumo preços */}
          <section className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { label: "Só placa", range: "4,50 - 8€", desc: "Material (placa standard)" },
              { label: "Montagem instalada", range: "12 - 22€", desc: "Material + mão de obra" },
              { label: "Instalado + pintado", range: "20 - 35€", desc: "Pronto a habitar" },
            ].map((item) => (
              <div key={item.label} className="glass-card p-6 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{item.label}</div>
                <div className="text-2xl font-black text-white mb-1">{item.range}</div>
                <div className="text-xs text-gray-400">por m²</div>
                <div className="text-sm text-gray-500 mt-2">{item.desc}</div>
              </div>
            ))}
          </section>

          {/* O que é pladur */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              O que é Pladur e Quando Usar
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              &ldquo;Pladur&rdquo; é o nome colloquial em Portugal para o sistema de{" "}
              <strong className="text-white">gesso cartonado</strong> (drywall).
              Originalmente uma marca registada, tornou-se sinónimo da categoria, tal como
              &ldquo;chiclete&rdquo; para pastilha elástica. Tecnicamente, é uma placa de
              gesso envolta em cartão especial, aparafusada a uma estrutura de perfis
              metálicos galvanizados.
            </p>
            <h3 className="text-lg font-bold text-white mb-3 mt-6">Aplicações típicas:</h3>
            <ul className="space-y-2 mb-6">
              {[
                "Divisórias interiores (paredes entre compartimentos)",
                "Tectos falsos lisos ou com iluminação embutida",
                "Revestimento interior de construção LSF e ICF",
                "Isolamento acústico entre quartos ou andares",
                "Nichos, reentrâncias e móveis embutidos",
                "Protecção corta-fogo em espaços técnicos",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Resposta directa — featured snippet */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Preço do Pladur por m² em 2026
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              O preço do pladur em Portugal em 2026 varia entre{" "}
              <strong className="text-white">4,50€/m² (só placa standard)</strong> e{" "}
              <strong className="text-white">35€/m² instalado e pintado</strong> com
              acabamento Q3. Placas hidrófugas e corta-fogo custam 25-40% mais. O valor
              final depende do tipo de placa, estrutura, isolamento e nível de acabamento
              exigido.
            </p>
          </section>

          <InlineCta searchIntent="comercial" />

          {/* Tabela por tipo de aplicação */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Tabela de Preços por Tipo de Aplicação
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-bold">Aplicação</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-bold">Só material</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-bold">Instalado</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-bold">Instalado + pintado</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelaPrecos.map((row) => (
                    <tr key={row.tipo} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white font-bold">{row.tipo}</td>
                      <td className="py-4 px-4 text-center text-gray-300">{row.material}</td>
                      <td className="py-4 px-4 text-center text-gray-300">{row.instalado}</td>
                      <td className="py-4 px-4 text-center text-blue-400 font-bold">{row.pintado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-4">
              * Valores indicativos por m² em Portugal continental (2026). Para tecto
              falso com áreas e geometrias específicas, veja o nosso guia dedicado em{" "}
              <Link href="/blog/tecto-falso-pladur-preco-m2" className="text-blue-400 hover:text-blue-300">
                Tecto Falso Pladur Preço m²
              </Link>
              .
            </p>
          </section>

          {/* O que influencia */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              O Que Influencia o Preço do Pladur m²
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Layers, title: "Tipo de placa", desc: "Standard (branca), hidrófuga (verde, +30-40%), corta-fogo (rosa, +25-35%) ou acústica (azul, +20%)." },
                { icon: Ruler, title: "Estrutura metálica", desc: "Perfis 48mm (standard), 70mm (acústica), 90mm (isolamento grosso). Distância entre montantes 40-60cm." },
                { icon: Wrench, title: "Isolamento incluído", desc: "Lã de rocha 40-60mm (+3-7€/m²), lã de vidro (+2-4€/m²), XPS (+4-6€/m²)." },
                { icon: Paintbrush, title: "Acabamento (Q2-Q5)", desc: "Q2 junta simples, Q3 pintável, Q4 luz directa, Q5 luz rasante (+15-25% entre cada nível)." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <item.icon className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mão de obra */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Mão de Obra: Preço por m² em 2026
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              O preço de mão de obra de pladur em Portugal em 2026 varia entre{" "}
              <strong className="text-white">8€ e 14€ por m²</strong>, dependendo da
              complexidade. Este valor cobre:
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Montagem da estrutura metálica (perfis horizontais e verticais)",
                "Aplicação das placas com parafusos autoperfurantes",
                "Rematamento de juntas com fita de papel e pasta",
                "Lixagem e preparação para pintura (acabamento Q3)",
                "Aplicação de primário (antes da pintura final)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500">
              <strong className="text-gray-400">Variância regional:</strong> Lisboa e
              Algarve cobram +10-15% sobre a tabela nacional. Interior e Norte podem
              ficar 5-10% abaixo. A pintura é habitualmente orçamentada à parte (5-10€/m²
              duas demãos).
            </p>
          </section>

          {/* Pladur com isolamento */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Pladur com Isolamento: Quanto Custa a Mais
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              O isolamento dentro da parede de pladur é um dos principais factores de
              custo extra. Valores adicionais por m² em 2026:
            </p>
            <div className="space-y-3">
              {[
                { tipo: "Lã de rocha 40mm (30-40 kg/m³)", custo: "+3 - 5€/m²" },
                { tipo: "Lã de rocha 60mm (40-50 kg/m³)", custo: "+4 - 7€/m²" },
                { tipo: "Lã de vidro 40mm", custo: "+2 - 4€/m²" },
                { tipo: "Lã de vidro 60mm", custo: "+3 - 5€/m²" },
                { tipo: "XPS extrudido 30-40mm", custo: "+4 - 6€/m²" },
                { tipo: "EPS + placa dupla (acústica reforçada)", custo: "+6 - 10€/m²" },
              ].map((item) => (
                <div key={item.tipo} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <span className="text-gray-300">{item.tipo}</span>
                  <span className="text-blue-400 font-bold text-sm">{item.custo}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Comparação */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Pladur vs Outras Soluções de Divisória
            </h2>
            <div className="space-y-4">
              {comparativo.map((item) => (
                <div key={item.metodo} className={`flex flex-wrap items-center justify-between p-4 rounded-xl ${item.destaque ? "bg-blue-500/10 border border-blue-500/20" : "bg-white/5"}`}>
                  <span className={`font-bold ${item.destaque ? "text-blue-400" : "text-gray-300"}`}>{item.metodo}</span>
                  <div className="flex gap-6 text-sm">
                    <span className="text-gray-400">{item.preco}</span>
                    <span className="text-gray-500">{item.tempo}</span>
                    <span className="text-gray-500">{item.peso}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-4">
              O pladur é 3x mais rápido e 7x mais leve que o tijolo, sendo ideal para
              remodelações e construção LSF.
            </p>
          </section>

          {/* Checklist de orçamento */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              O Que Pedir num Orçamento de Pladur
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Para comparar orçamentos de forma justa, exija que o empreiteiro especifique:
            </p>
            <ul className="space-y-2">
              {[
                "Metros quadrados medidos em altura completa (pé direito real)",
                "Tipo exacto de placa (standard, hidrófuga, corta-fogo, acústica)",
                "Espessura da placa (12,5mm vs 13mm vs 15mm)",
                "Se inclui estrutura metálica ou se é orçada à parte",
                "Tipo de estrutura (48mm / 70mm / 90mm)",
                "Se inclui isolamento e qual o material + espessura",
                "Nível de acabamento (Q2 / Q3 / Q4 / Q5)",
                "Se a pintura está incluída (primário + nº de demãos)",
                "Remates com rodapés, aros de porta e tectos",
                "Prazo de execução por m² e garantia",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Links internos */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Artigos Relacionados</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { href: "/blog/tecto-falso-pladur-preco-m2", label: "Tecto Falso Pladur: Preço por m²" },
                { href: "/preco-construcao-lsf-por-m2", label: "Preço de Construção LSF por m²" },
                { href: "/metodologia-construtiva", label: "Metodologia Construtiva LSF" },
                { href: "/blog/descubra-tudo-sobre-isolamento-termico-melhores-materiais-e-instalacao", label: "Guia Completo de Isolamento Térmico" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="glass-card p-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </section>

          <FaqSection faqs={faqs} />
          <AuthorSection />

          <div className="glass-card p-8 text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-3">
              Quer um Orçamento Personalizado de Pladur?
            </h2>
            <p className="text-gray-400 mb-6">
              Calcule em 2 minutos o custo do seu projecto de divisórias ou tectos em
              pladur.
            </p>
            <Link href="/simulador" className="btn-primary rounded-full px-10 py-4 font-bold inline-flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Simular Custos Grátis
            </Link>
          </div>

          <WhatsAppCta titulo="Pladur Preço m²" />
        </div>
      </main>
    </>
  );
}
