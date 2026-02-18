"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

/* ═══════════════════════════════════════════════════
   Main Hero Component
   ═══════════════════════════════════════════════════ */
export default function HeroEngineering2030() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  /* IntersectionObserver — activate content */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen"
    >
      <div className="flex items-center min-h-screen overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-0 w-full relative z-10">
          <div className="max-w-2xl">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 animate-fade-in">
              Sistema de Engenharia Estrutural Assistida por IA
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter leading-[0.95] animate-fade-in"
              style={{ animationDelay: "0.15s" }}
            >
              Construção LSF
              <br />
              <span className="text-gradient">Inteligente.</span>
            </h1>

            <p
              className="text-base md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-medium animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Planta. Quantidades. Orçamento. Cronograma.
              <br className="hidden md:block" />
              Tudo gerado por IA.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in"
              style={{ animationDelay: "0.45s" }}
            >
              <Link
                href="/simulador"
                className="btn-primary hero-cta-primary rounded-full px-8 py-4 text-base font-bold flex items-center justify-center gap-3"
              >
                Gerar Estudo Técnico <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#como-funciona"
                className="btn-secondary rounded-full px-8 py-4 text-base font-bold flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" /> Ver Engenharia em Ação
              </Link>
            </div>

            <div
              className="grid grid-cols-4 gap-6 mt-14 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              {[
                { val: "35%", label: "Mais Económico" },
                { val: "3x", label: "Mais Rápido" },
                { val: "A+", label: "Classe Energética" },
                { val: "50+", label: "Anos Garantia" },
              ].map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                    {s.val}
                  </div>
                  <div className="text-[8px] font-bold text-blue-400/80 uppercase tracking-[0.2em] mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ambient glows */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[120px] -z-10 pointer-events-none" />
      </div>
    </section>
  );
}
