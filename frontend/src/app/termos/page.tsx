import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Termos e Condições | OBRASNET - Casas LSF",
  description:
    "Termos e condições de utilização do website casaslsf.com da OBRASNET UNIP LDA. Condições gerais de uso, responsabilidades e direitos.",
  alternates: { canonical: "https://casaslsf.com/termos" },
  robots: { index: true, follow: true },
};

const breadcrumbs = [
  { label: "Início", href: "/" },
  { label: "Termos e Condições" },
];

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-transparent py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 mt-8">
          Termos e Condições
        </h1>
        <p className="text-gray-500 text-sm mb-12">
          Última atualização: 17 de fevereiro de 2026
        </p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Identificação</h2>
            <p>
              O presente website, acessível em casaslsf.com, é propriedade e operado por:
            </p>
            <ul className="mt-3 space-y-1 text-sm text-gray-400">
              <li><strong className="text-gray-300">Empresa:</strong> OBRASNET UNIP LDA</li>
              <li><strong className="text-gray-300">NIF:</strong> 515 866 989</li>
              <li><strong className="text-gray-300">Alvará IMPIC:</strong> 94665</li>
              <li><strong className="text-gray-300">Morada:</strong> R. Abade Faria 18, 1.º Dto, 2725-475 Mem Martins, Sintra</li>
              <li><strong className="text-gray-300">Email:</strong> orcamento@casaslsf.com</li>
              <li><strong className="text-gray-300">Telefone:</strong> +351 930 423 456</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Objeto</h2>
            <p>
              Estes Termos e Condições regulam o acesso e utilização do website casaslsf.com,
              incluindo todos os seus conteúdos, funcionalidades, simuladores e formulários.
              Ao aceder e utilizar este website, o utilizador aceita integralmente os presentes termos.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Serviços Disponibilizados</h2>
            <p>O website disponibiliza os seguintes serviços:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-gray-400">
              <li>Informação sobre construção em Light Steel Framing (LSF)</li>
              <li>Simulador de custos para projetos de construção</li>
              <li>Geração de estudos técnicos preliminares</li>
              <li>Formulários de contacto e pedido de orçamento</li>
              <li>Conteúdos informativos e educacionais (blog)</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Simulações e Estimativas</h2>
            <p>
              Os valores apresentados pelo simulador e estudos técnicos gerados no website são
              meramente indicativos e não constituem uma proposta comercial vinculativa.
              Os valores finais dependem de uma análise técnica detalhada do projeto,
              condições do terreno, localização e especificações solicitadas pelo cliente.
            </p>
            <p className="mt-3">
              A OBRASNET reserva-se o direito de apresentar valores diferentes dos simulados
              após avaliação presencial e elaboração de projeto definitivo.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Propriedade Intelectual</h2>
            <p>
              Todos os conteúdos deste website — incluindo textos, imagens, gráficos, logótipos,
              modelos 3D, código-fonte e design — são propriedade da OBRASNET UNIP LDA ou dos seus
              licenciadores, estando protegidos pela legislação portuguesa e europeia de propriedade intelectual.
            </p>
            <p className="mt-3">
              É proibida a reprodução, distribuição, modificação ou utilização comercial de qualquer
              conteúdo deste website sem autorização prévia por escrito da OBRASNET.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Responsabilidade do Utilizador</h2>
            <p>O utilizador compromete-se a:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-gray-400">
              <li>Fornecer dados verdadeiros e atualizados nos formulários</li>
              <li>Não utilizar o website para fins ilegais ou não autorizados</li>
              <li>Não tentar aceder a áreas restritas ou interferir com o funcionamento do site</li>
              <li>Não reproduzir ou distribuir conteúdos sem autorização</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Limitação de Responsabilidade</h2>
            <p>
              A OBRASNET esforça-se por manter as informações do website atualizadas e corretas,
              mas não garante a ausência de erros, inexatidões ou omissões. O website é disponibilizado
              &quot;tal como está&quot;, sem garantias de qualquer tipo.
            </p>
            <p className="mt-3">
              A OBRASNET não se responsabiliza por danos diretos ou indiretos decorrentes da utilização
              ou impossibilidade de utilização do website, incluindo perda de dados ou lucros cessantes.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Links Externos</h2>
            <p>
              Este website pode conter links para sites de terceiros (WhatsApp, redes sociais, etc.).
              A OBRASNET não se responsabiliza pelo conteúdo, políticas de privacidade ou práticas
              desses websites externos.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Comunicações Comerciais</h2>
            <p>
              Ao submeter os seus dados através dos formulários do website, o utilizador consente
              ser contactado pela equipa comercial da OBRASNET relativamente ao pedido efetuado.
              Este contacto poderá ser feito por telefone, email ou WhatsApp.
            </p>
            <p className="mt-3">
              O utilizador pode a qualquer momento solicitar a cessação destas comunicações
              contactando-nos através de{" "}
              <a href="mailto:orcamento@casaslsf.com" className="text-blue-400 hover:underline">
                orcamento@casaslsf.com
              </a>.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Proteção de Dados</h2>
            <p>
              O tratamento de dados pessoais é regido pela nossa{" "}
              <Link href="/privacidade" className="text-blue-400 hover:underline">
                Política de Privacidade
              </Link>
              , que constitui parte integrante destes Termos e Condições.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Alterações aos Termos</h2>
            <p>
              A OBRASNET reserva-se o direito de alterar estes Termos e Condições a qualquer momento,
              sem aviso prévio. As alterações entram em vigor a partir da data de publicação nesta página.
              O uso continuado do website após qualquer alteração constitui aceitação dos novos termos.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">12. Lei Aplicável e Foro</h2>
            <p>
              Estes Termos e Condições são regidos pela legislação portuguesa.
              Para a resolução de qualquer litígio emergente da utilização deste website,
              será competente o Tribunal da Comarca de Sintra, com renúncia expressa a qualquer outro.
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
