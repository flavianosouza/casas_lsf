import type { Metadata } from "next";
import Link from "next/link";
import { Landmark, Percent, FileText, Calculator, CheckCircle, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import InlineCta from "@/components/InlineCta";
import WhatsAppCta from "@/components/WhatsAppCta";
import AuthorSection from "@/components/AuthorSection";
import AssistantLazy from "@/components/assistant/AssistantLazy";

export const metadata: Metadata = {
  title: "Financiamento Casa LSF | Crédito Habitação Construção 2026",
  description:
    "Como financiar a construção de uma casa em LSF: crédito habitação, documentos, spreads médios e bancos que financiam. Guia completo para Portugal.",
  keywords: [
    "financiamento casa LSF", "crédito habitação construção", "banco financia LSF",
    "crédito construção Portugal", "spread crédito habitação", "empréstimo construção casa",
  ],
  alternates: { canonical: "https://casaslsf.com/casa-lsf-financiamento" },
  openGraph: {
    title: "Financiamento Casa LSF | Crédito Habitação 2026",
    description: "Guia completo sobre financiamento para construção de casas em LSF em Portugal.",
    url: "https://casaslsf.com/casa-lsf-financiamento",
    type: "article",
  },
};

const faqs = [
  { pergunta: "Os bancos financiam construção em LSF?", resposta: "Sim. Todos os principais bancos portugueses (CGD, Millennium BCP, Santander, Novo Banco, BPI, Bankinter) financiam construção em LSF, desde que o projeto tenha licença de construção aprovada." },
  { pergunta: "Qual é o spread médio para crédito habitação?", resposta: "O spread médio em Portugal situa-se entre 0,85% e 1,5% (2026), dependendo do banco, perfil do cliente, LTV e montante. Negociar com vários bancos pode poupar milhares de euros." },
  { pergunta: "Que percentagem o banco financia?", resposta: "Os bancos financiam tipicamente 80% a 90% do valor de avaliação do imóvel. Para construção, o financiamento é libertado em tranches conforme o avanço da obra." },
  { pergunta: "Preciso de terreno próprio para pedir crédito?", resposta: "Sim. O terreno deve estar em nome do requerente (ou com CPCV) e ter viabilidade de construção confirmada pela câmara municipal. O terreno pode entrar como capital próprio." },
  { pergunta: "O crédito para construção tem condições diferentes?", resposta: "Sim. O crédito para construção é libertado em tranches (3-5 fases) conforme o avanço da obra, avaliado por perito do banco. Durante a construção, paga apenas juros sobre o capital libertado." },
];

const bancos = [
  { nome: "CGD", spread: "0,85% - 1,2%", financia: "até 90%", nota: "Protocolo para casas sustentáveis" },
  { nome: "Millennium BCP", spread: "0,9% - 1,3%", financia: "até 85%", nota: "Spread bonificado com domiciliação" },
  { nome: "Santander", spread: "0,85% - 1,4%", financia: "até 85%", nota: "Processo rápido de aprovação" },
  { nome: "Novo Banco", spread: "0,9% - 1,35%", financia: "até 85%", nota: "Boas condições para jovens" },
  { nome: "BPI", spread: "0,95% - 1,5%", financia: "até 80%", nota: "Avaliação de eficiência energética" },
  { nome: "Bankinter", spread: "0,85% - 1,2%", financia: "até 80%", nota: "Spreads competitivos" },
];

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Financiamento Casa LSF" },
];

export default function FinanciamentoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Financiamento para Casa LSF - Crédito Habitação Construção",
    description: "Guia completo sobre crédito habitação para construção de casas em LSF em Portugal.",
    url: "https://casaslsf.com/casa-lsf-financiamento",
    author: { "@type": "Organization", name: "OBRASNET UNIP LDA" },
    publisher: { "@type": "Organization", name: "Casas LSF", url: "https://casaslsf.com" },
    articleSection: "Crédito Habitação",
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
              Guia Financeiro 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              Financiamento{" "}
              <span className="text-gradient">Casa LSF</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              Todos os bancos portugueses financiam construção em LSF. Conheça os spreads,
              condições, documentos necessários e como maximizar o financiamento para
              o seu projeto.
            </p>
          </header>

          <AssistantLazy />

          {/* Como funciona */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Como Funciona o Crédito para Construção?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              O crédito para construção é diferente do crédito para compra de casa.
              O banco liberta o dinheiro em tranches (fases) conforme a obra avança,
              e um perito avaliador verifica o progresso antes de cada libertação.
            </p>
            <div className="space-y-4">
              {[
                { fase: "Tranche 1", momento: "Fundações concluídas", percentagem: "20-25%" },
                { fase: "Tranche 2", momento: "Estrutura erguida", percentagem: "25-30%" },
                { fase: "Tranche 3", momento: "Coberta e instalações", percentagem: "20-25%" },
                { fase: "Tranche 4", momento: "Acabamentos", percentagem: "15-20%" },
                { fase: "Tranche 5", momento: "Conclusão e licença", percentagem: "5-10%" },
              ].map((t) => (
                <div key={t.fase} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold text-sm">{t.fase}</span>
                    <span className="text-gray-400 text-sm">{t.momento}</span>
                  </div>
                  <span className="text-white font-bold">{t.percentagem}</span>
                </div>
              ))}
            </div>
          </section>

          <InlineCta searchIntent="comercial" />

          {/* Tabela bancos */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Spreads por Banco (2026)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-bold">Banco</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-bold">Spread</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-bold">Financia</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-bold hidden md:table-cell">Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {bancos.map((banco) => (
                    <tr key={banco.nome} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white font-bold">{banco.nome}</td>
                      <td className="py-4 px-4 text-center text-blue-400">{banco.spread}</td>
                      <td className="py-4 px-4 text-center text-gray-300">{banco.financia}</td>
                      <td className="py-4 px-4 text-gray-500 text-xs hidden md:table-cell">{banco.nota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-4">
              * Valores indicativos para 2026. Spreads variam conforme perfil do cliente, LTV e negociação. Consulte cada banco.
            </p>
          </section>

          {/* Documentos */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Documentos Necessários
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" /> Pessoais
                </h3>
                <ul className="space-y-2">
                  {[
                    "Cartão de Cidadão", "Últimos 3 recibos de vencimento",
                    "Declaração de IRS (último ano)", "Extratos bancários (3-6 meses)",
                    "Declaração de vínculo laboral", "Mapa de responsabilidades (Banco de Portugal)",
                  ].map((doc) => (
                    <li key={doc} className="flex items-center gap-2 text-gray-400 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500/60" /> {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" /> Do Projeto
                </h3>
                <ul className="space-y-2">
                  {[
                    "Caderneta predial do terreno", "Certidão de teor do terreno",
                    "Projeto de arquitetura aprovado", "Licença de construção",
                    "Orçamento detalhado da obra", "Cronograma financeiro (tranches)",
                  ].map((doc) => (
                    <li key={doc} className="flex items-center gap-2 text-gray-400 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500/60" /> {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Dicas */}
          <section className="glass-card p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              Dicas para Conseguir o Melhor Financiamento
            </h2>
            <ul className="space-y-4">
              {[
                { tip: "Compare pelo menos 3 bancos", desc: "A diferença de 0,2% no spread pode representar 10.000-15.000€ ao longo do empréstimo." },
                { tip: "Use o terreno como capital próprio", desc: "Se já tem terreno, o banco considera-o como entrada, reduzindo o LTV e melhorando o spread." },
                { tip: "Negocie bonificações", desc: "Domiciliação de ordenado, seguros e cartões podem baixar o spread em 0,1-0,3%." },
                { tip: "Escolha taxa mista", desc: "Os primeiros 2-5 anos a taxa fixa dão previsibilidade durante a fase mais crítica do empréstimo." },
                { tip: "Apresente projeto licenciado", desc: "Ter a licença de construção aprovada antes de ir ao banco acelera o processo." },
              ].map((item) => (
                <li key={item.tip} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold text-sm">{item.tip}</span>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Aviso */}
          <div className="flex items-start gap-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl mb-12">
            <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-gray-400 text-sm">
              <strong className="text-yellow-400">Nota:</strong> As informações de spreads e condições bancárias
              são indicativas e podem variar. Consulte sempre diretamente os bancos para condições atualizadas.
              A OBRASNET não é intermediária de crédito.
            </p>
          </div>

          {/* Links internos */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Artigos Relacionados</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { href: "/quanto-custa-casa-lsf", label: "Quanto Custa uma Casa LSF?" },
                { href: "/preco-construcao-lsf-por-m2", label: "Preço de Construção por m²" },
                { href: "/blog/financiar-construcao-casa-lsf", label: "Guia: Financiar Construção LSF" },
                { href: "/blog/documentos-necessarios-para-pedir-credito-habitacao", label: "Documentos para Crédito Habitação" },
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
              Quer Saber Quanto Custaria a Sua Prestação?
            </h2>
            <p className="text-gray-400 mb-6">
              Simule o custo total do seu projeto e prepare-se antes de ir ao banco.
            </p>
            <Link href="/simulador" className="btn-primary rounded-full px-10 py-4 font-bold inline-flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Simular Custos Grátis
            </Link>
          </div>

          <WhatsAppCta titulo="Financiamento Casa LSF" />
        </div>
      </main>
    </>
  );
}
