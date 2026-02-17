import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Empresa */}
          <div>
            <Link href="/" className="mb-4 block">
              <Image src="/images/logo-obrasnet.png" alt="OBRASNET" width={150} height={38} />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Construção em Light Steel Framing com inteligência e transparência.
              Projetos de raiz, do terreno à chave na mão.
            </p>
            <p className="text-gray-600 text-xs">
              OBRASNET UNIP LDA
              <br />
              NIF: 515 866 989
              <br />
              Alvará IMPIC: 94665
            </p>
          </div>

          {/* Links rapidos */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Serviços
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/simulador", label: "Simulador de Custos" },
                { href: "/plantas", label: "Plantas LSF" },
                { href: "/custos", label: "Tabela de Preços" },
                { href: "/metodos", label: "Método Construtivo" },
                { href: "/como-funciona", label: "Como Funciona" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Construção LSF */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Construção LSF
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/preco-construcao-lsf-por-m2", label: "Preço por m²" },
                { href: "/quanto-custa-casa-lsf", label: "Quanto Custa Casa LSF" },
                { href: "/metodologia-construtiva", label: "Metodologia LSF" },
                { href: "/processo-construcao-lsf", label: "Processo Construtivo" },
                { href: "/casa-lsf-financiamento", label: "Financiamento" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conteúdo */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Conteúdo
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/sobre-obrasnet", label: "Sobre a OBRASNET" },
                { href: "/empresa-construcao-lsf-portugal", label: "Empresa LSF Portugal" },
                {
                  href: "/blog/casas-lsf-portugal-guia-completo",
                  label: "Guia LSF Portugal",
                },
                {
                  href: "/blog/lsf-vs-alvenaria-portugal",
                  label: "LSF vs Alvenaria",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+351930423456"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-500" /> +351 930 423 456
                </a>
              </li>
              <li>
                <a
                  href="mailto:orcamento@casaslsf.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-blue-500" /> orcamento@casaslsf.com
                </a>
              </li>
              <li>
                <span className="text-gray-400 text-sm flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>
                    R. Abade Faria 18, 1.o Dto
                    <br />
                    2725-475 Mem Martins, Sintra
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} OBRASNET UNIP LDA. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link href="/privacidade" className="hover:text-gray-400 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-gray-400 transition-colors">
              Termos e Condições
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
