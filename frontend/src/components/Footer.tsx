import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Empresa */}
          <div>
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter mb-4 block"
            >
              CASAS<span className="text-blue-500">LSF</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Construcao em Light Steel Framing com inteligencia e transparencia.
              Projectos de raiz, do terreno a chave na mao.
            </p>
            <p className="text-gray-600 text-xs">
              OBRASNET UNIP LDA
              <br />
              NIF: 515 866 989
              <br />
              Alvara IMPIC: 94665
            </p>
          </div>

          {/* Links rapidos */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Servicos
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/simulador", label: "Simulador de Custos" },
                { href: "/plantas", label: "Plantas LSF" },
                { href: "/custos", label: "Tabela de Precos" },
                { href: "/metodos", label: "Metodo Construtivo" },
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

          {/* Conteudo */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Conteudo
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/blog", label: "Blog" },
                {
                  href: "/blog/casas-lsf-portugal-guia-completo",
                  label: "Guia LSF Portugal",
                },
                {
                  href: "/blog/lsf-vs-alvenaria-portugal",
                  label: "LSF vs Alvenaria",
                },
                {
                  href: "/blog/quanto-custa-casa-lsf-portugal",
                  label: "Custos de Construcao",
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
              Politica de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-gray-400 transition-colors">
              Termos e Condicoes
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
