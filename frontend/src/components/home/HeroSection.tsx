import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-36 pb-20 md:pt-56 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <div className="inline-block mb-8 px-5 py-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 animate-fade-in">
          Sistema de Engenharia Estrutural Assistida por IA
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter animate-fade-in leading-[0.9]"
          style={{ animationDelay: "0.1s" }}
        >
          Da Ideia à Casa Construída
          <br />
          com <span className="text-gradient">Inteligência Estrutural</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-2xl text-gray-400 mb-14 mx-auto max-w-3xl leading-relaxed font-medium animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Planta, orçamento detalhado e cronograma de obra
          <br className="hidden md:block" />
          — gerados em minutos com precisão de engenharia.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/simulador"
            className="btn-primary rounded-full px-10 py-5 text-lg font-bold flex items-center justify-center gap-3"
          >
            Gerar Estudo Inteligente <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#como-funciona"
            className="btn-secondary rounded-full px-10 py-5 text-lg font-bold flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" /> Ver Como Funciona
          </Link>
        </div>

        {/* Hero Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            { val: "35%", label: "Mais Económico" },
            { val: "3x", label: "Mais Rápido" },
            { val: "A+", label: "Classe Energética" },
            { val: "50+", label: "Anos Garantia" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                {s.val}
              </div>
              <div className="text-[9px] font-bold text-blue-400/80 uppercase tracking-[0.25em] mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-500/8 rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
}
