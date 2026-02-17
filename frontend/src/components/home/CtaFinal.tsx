import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function CtaFinal() {
  return (
    <section className="py-28 md:py-40 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-white leading-[0.95]">
            Transforme a sua
            <br />
            <span className="text-gradient">Visão em Realidade</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
            O futuro da construção não é apenas sobre materiais
            — é sobre inteligência, transparência e execução real.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/simulador"
              className="btn-primary rounded-full px-10 py-5 text-lg font-bold flex items-center justify-center gap-3"
            >
              Começar Simulação Agora <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/351930423456"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary rounded-full px-10 py-5 text-lg font-bold flex items-center justify-center gap-2 hover:border-green-500/40 hover:text-green-400 transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> Falar com Especialista
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </section>
  );
}
