"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

const LSFStructure3D = dynamic(() => import("./LSFStructure3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center" style={{ height: "420px" }}>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-[10px] font-mono text-blue-400/60 uppercase tracking-wider">
          A carregar modelo 3D...
        </span>
      </div>
    </div>
  ),
});

/* ─── Count-up hook ─── */
function useCountUp(end: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, active]);
  return count;
}

/* ─── Mini Dashboard ─── */
function MiniDashboard({ active }: { active: boolean }) {
  const metrics = [
    { value: 230, label: "Materiais Ativos" },
    { value: 34, label: "Composições" },
    { value: 13, label: "Cat. Orçamento" },
    { value: 0, label: "Meses Prazo", display: "6 a 12" },
  ];

  return (
    <div
      className="hero-dashboard p-4 md:p-5"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.3s",
      }}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">
          Motor de Engenharia
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {metrics.map((m, i) => (
          <DashboardMetric key={i} value={m.value} label={m.label} display={m.display} active={active} delay={300 + i * 200} />
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            style={{
              width: active ? "78%" : "0%",
              transition: "width 1.5s ease 1s",
            }}
          />
        </div>
        <span className="text-[8px] font-mono text-gray-500">78%</span>
      </div>
    </div>
  );
}

function DashboardMetric({
  value,
  label,
  display,
  active,
  delay,
}: {
  value: number;
  label: string;
  display?: string;
  active: boolean;
  delay: number;
}) {
  const count = useCountUp(value, 1200, active);
  return (
    <div
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(8px)",
        transition: `all 0.4s ease ${delay}ms`,
      }}
    >
      <div className="text-xl font-black text-white font-mono leading-none tracking-tight">
        {display || count}
      </div>
      <div className="text-[8px] uppercase tracking-wider text-gray-500 mt-1 leading-tight">
        {label}
      </div>
    </div>
  );
}

/* ─── Phase labels for scroll-driven construction ─── */
const PHASES = [
  { num: "01", label: "FUNDAÇÃO" },
  { num: "02", label: "ESTRUTURA" },
  { num: "03", label: "LAJE / DIVISÓRIAS" },
  { num: "04", label: "COBERTURA" },
];

/* ═══════════════════════════════════════════════════
   Main Hero Component
   ═══════════════════════════════════════════════════ */
export default function HeroEngineering2030() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(false);
  const [scrollMode, setScrollMode] = useState(false);
  const [phase, setPhase] = useState(-1);
  const [buildComplete, setBuildComplete] = useState(false);

  /* Detect desktop for scroll mode */
  useEffect(() => {
    setScrollMode(window.innerWidth >= 1024);
  }, []);

  /* IntersectionObserver — activate left content */
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

  /* Scroll tracking (desktop only) */
  useEffect(() => {
    if (!scrollMode) return;

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      progressRef.current = progress;

      // Phase detection
      let p: number;
      if (progress < 0.04) p = -1;
      else if (progress < 0.12) p = 0;
      else if (progress < 0.50) p = 1;
      else if (progress < 0.72) p = 2;
      else p = 3;

      setPhase((prev) => (prev !== p ? p : prev));

      if (progress >= 0.92 && !buildComplete) setBuildComplete(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollMode, buildComplete]);

  const dashboardActive = scrollMode ? buildComplete : active;

  return (
    <section
      ref={sectionRef}
      className={`relative ${scrollMode ? "h-[300vh]" : "min-h-screen"}`}
    >
      <div
        className={`flex items-center overflow-hidden ${
          scrollMode ? "sticky top-0 h-screen" : "min-h-screen"
        }`}
      >
        {/* Grid background */}
        <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-0 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* ─── Left: Content ─── */}
            <div className="order-2 lg:order-1">
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

            {/* ─── Right: Interactive 3D ─── */}
            <div className="order-1 lg:order-2 relative">
              {/* Status bar */}
              <div
                className="flex items-center justify-between mb-3 px-1"
                style={{
                  opacity: active ? 1 : 0,
                  transition: "opacity 0.5s ease 0.5s",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-blue-300/80 uppercase tracking-wider">
                    Modelo Estrutural LSF
                  </span>
                </div>
                <span className="text-[8px] font-mono text-gray-600">
                  PRJ-2025-042
                </span>
              </div>

              {/* 3D viewport */}
              <div className="overflow-hidden relative">
                <LSFStructure3D
                  scrollProgress={scrollMode ? progressRef : undefined}
                />

                {/* Phase label overlay */}
                {scrollMode && phase >= 0 && (
                  <div
                    key={phase}
                    className="absolute bottom-16 left-4 pointer-events-none"
                    style={{ animation: "fadeSlideUp 0.4s ease forwards" }}
                  >
                    <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-[10px] font-mono text-blue-400 font-bold">
                        {PHASES[phase].num}
                      </span>
                      <div className="w-6 h-px bg-gray-600" />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-300">
                        {PHASES[phase].label}
                      </span>
                    </div>
                  </div>
                )}

                {/* Build complete badge */}
                {scrollMode && buildComplete && (
                  <div
                    className="absolute top-4 right-4 pointer-events-none"
                    style={{ animation: "fadeSlideUp 0.5s ease forwards" }}
                  >
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-green-400">
                        Construção Completa
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Dashboard — appears after build completes */}
              <div className="mt-4">
                <MiniDashboard active={dashboardActive} />
              </div>

              {/* Glow */}
              <div className="absolute -inset-8 bg-blue-500/8 rounded-3xl blur-[80px] -z-10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Scroll indicator — desktop only, before construction starts */}
        {scrollMode && (
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
            style={{
              opacity: phase < 0 ? 0.8 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-medium">
              Scroll para construir
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400 animate-bounce" />
          </div>
        )}

        {/* Ambient glows */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[120px] -z-10 pointer-events-none" />
      </div>
    </section>
  );
}
