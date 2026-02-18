import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Política de Privacidade | OBRASNET - Casas LSF",
  description:
    "Política de privacidade da OBRASNET UNIP LDA. Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais no site casaslsf.com.",
  alternates: { canonical: "https://casaslsf.com/privacidade" },
  robots: { index: true, follow: true },
};

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Política de Privacidade" },
];

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-transparent py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 mt-8">
          Política de Privacidade
        </h1>
        <p className="text-gray-500 text-sm mb-12">
          Última atualização: 17 de fevereiro de 2026
        </p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Responsável pelo Tratamento</h2>
            <p>
              O responsável pelo tratamento dos dados pessoais recolhidos neste website é:
            </p>
            <ul className="mt-3 space-y-1 text-sm text-gray-400">
              <li><strong className="text-gray-300">Empresa:</strong> OBRASNET UNIP LDA</li>
              <li><strong className="text-gray-300">NIF:</strong> 515 866 989</li>
              <li><strong className="text-gray-300">Morada:</strong> R. Abade Faria 18, 1.º Dto, 2725-475 Mem Martins, Sintra</li>
              <li><strong className="text-gray-300">Email:</strong> orcamento@casaslsf.com</li>
              <li><strong className="text-gray-300">Telefone:</strong> +351 930 423 456</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Dados Pessoais Recolhidos</h2>
            <p>
              Recolhemos apenas os dados que o utilizador fornece voluntariamente através dos nossos formulários:
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-gray-400">
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Número de telefone / WhatsApp</li>
              <li>Localização do terreno (concelho / distrito)</li>
              <li>Dados do projeto (tipologia, área, notas adicionais)</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Finalidade do Tratamento</h2>
            <p>Os dados pessoais são utilizados exclusivamente para:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-gray-400">
              <li>Gerar estudos técnicos e orçamentos personalizados</li>
              <li>Contactar o utilizador para seguimento comercial</li>
              <li>Enviar notificações relacionadas com o seu pedido</li>
              <li>Melhorar os nossos serviços e experiência do utilizador</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Base Legal</h2>
            <p>
              O tratamento dos dados pessoais baseia-se no consentimento do titular (artigo 6.º, n.º 1, alínea a) do RGPD),
              prestado ao submeter os formulários do site, bem como na execução de diligências pré-contratuais
              (artigo 6.º, n.º 1, alínea b) do RGPD).
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Partilha de Dados</h2>
            <p>
              Os seus dados pessoais não são vendidos, cedidos ou partilhados com terceiros para fins de marketing.
              Poderão ser partilhados com:
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-gray-400">
              <li>Prestadores de serviços tecnológicos (alojamento, email) para operação do site</li>
              <li>Autoridades competentes, quando legalmente exigido</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Conservação dos Dados</h2>
            <p>
              Os dados pessoais são conservados durante o período necessário para a finalidade que motivou a sua recolha,
              ou conforme exigido por obrigações legais. Os dados de leads comerciais são conservados por um período
              máximo de 24 meses após o último contacto.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Direitos do Titular</h2>
            <p>Nos termos do RGPD, o utilizador tem direito a:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-gray-400">
              <li><strong className="text-gray-300">Acesso</strong> — consultar os dados pessoais que detemos</li>
              <li><strong className="text-gray-300">Retificação</strong> — corrigir dados inexatos ou incompletos</li>
              <li><strong className="text-gray-300">Apagamento</strong> — solicitar a eliminação dos dados</li>
              <li><strong className="text-gray-300">Portabilidade</strong> — receber os dados num formato estruturado</li>
              <li><strong className="text-gray-300">Oposição</strong> — opor-se ao tratamento em determinadas circunstâncias</li>
              <li><strong className="text-gray-300">Limitação</strong> — solicitar a limitação do tratamento</li>
            </ul>
            <p className="mt-3">
              Para exercer qualquer destes direitos, contacte-nos através de{" "}
              <a href="mailto:orcamento@casaslsf.com" className="text-blue-400 hover:underline">
                orcamento@casaslsf.com
              </a>.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Cookies</h2>
            <p>
              Este website pode utilizar cookies essenciais para o funcionamento correto do site.
              Não utilizamos cookies de rastreamento publicitário de terceiros.
              Cookies analíticos poderão ser utilizados de forma anonimizada para melhorar a experiência do utilizador.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Segurança</h2>
            <p>
              Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais
              contra acesso não autorizado, perda, destruição ou alteração. Toda a comunicação entre o seu browser
              e o nosso servidor é encriptada via HTTPS/TLS.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Autoridade de Controlo</h2>
            <p>
              Se considerar que o tratamento dos seus dados viola o RGPD, tem o direito de apresentar uma reclamação
              junto da{" "}
              <strong className="text-gray-300">
                Comissão Nacional de Proteção de Dados (CNPD)
              </strong>{" "}
              — <span className="text-gray-400">www.cnpd.pt</span>.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Alterações a esta Política</h2>
            <p>
              Reservamo-nos o direito de atualizar esta política de privacidade a qualquer momento.
              Quaisquer alterações serão publicadas nesta página com a data de atualização revista.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <Link href="/" className="text-blue-400 text-sm font-semibold hover:underline">
            &larr; Voltar à Página Inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
