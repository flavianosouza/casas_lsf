"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

interface Phase {
  name: string;
  duration: string;
  weeks: number;
  offset: number; /* start week */
  color: string;
  status: string;
}

const phases: Phase[] = [
  { name: "Projeto", duration: "4-6 sem", weeks: 5, offset: 0, color: "#3b82f6", status: "Concluído" },
  { name: "Licenciamento", duration: "12-16 sem", weeks: 14, offset: 5, color: "#6366f1", status: "Em curso" },
  { name: "Estrutura LSF", duration: "3-4 sem", weeks: 4, offset: 19, color: "#06b6d4", status: "Pendente" },
  { name: "Fechamentos", duration: "4-6 sem", weeks: 5, offset: 23, color: "#06b6d4", status: "Pendente" },
  { name: "Acabamentos", duration: "6-8 sem", weeks: 7, offset: 28, color: "#06b6d4", status: "Pendente" },
];

const totalWeeks = 35;

const statusColors: Record<string, string> = {
  "Concluído": "text-green-400",
  "Em curso": "text-cyan-400",
  "Pendente": "text-gray-500",
};

export default function TimelineExecutivePreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-black/20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-3">
            Planeamento
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
            Cronograma{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Executivo
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
            Prazo total estimado: 8-10 meses · Exemplo moradia T3
          </p>
        </ScrollReveal>

        <div ref={ref} className="space-y-3">
          {phases.map((phase, i) => {
            const leftPct = (phase.offset / totalWeeks) * 100;
            const widthPct = (phase.weeks / totalWeeks) * 100;
            const delay = i * 200;
            const isHovered = hoveredIdx === i;

            return (
              <div
                key={i}
                className="gantt-row group"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateX(0)" : "translateX(-30px)",
                  transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
                }}
              >
                {/* Phase info */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-200">
                      {phase.name}
                    </span>
                    <span className={`text-[10px] font-bold ${statusColors[phase.status]}`}>
                      {phase.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    {phase.duration}
                  </span>
                </div>

                {/* Gantt bar track */}
                <div className="relative h-7 bg-white/3 rounded-md overflow-hidden">
                  <div
                    className="absolute top-0 h-full rounded-md transition-all duration-300"
                    style={{
                      left: `${leftPct}%`,
                      width: active ? `${widthPct}%` : "0%",
                      background: `linear-gradient(90deg, ${phase.color}, ${phase.color}88)`,
                      transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay + 400}ms`,
                      boxShadow: isHovered
                        ? `0 0 16px ${phase.color}40`
                        : "none",
                    }}
                  />

                  {/* Week markers */}
                  {Array.from({ length: 7 }, (_, j) => (
                    <div
                      key={j}
                      className="absolute top-0 h-full border-l border-white/3"
                      style={{ left: `${((j + 1) / 7) * 100}%` }}
                    />
                  ))}

                  {/* Hover tooltip */}
                  {isHovered && (
                    <div
                      className="absolute top-0 h-full flex items-center text-[10px] font-bold text-white/90 px-2"
                      style={{ left: `${leftPct}%` }}
                    >
                      Sem. {phase.offset + 1}–{phase.offset + phase.weeks}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Timeline scale */}
          <div
            className="flex justify-between pt-3 text-[9px] text-gray-600 font-mono"
            style={{
              opacity: active ? 1 : 0,
              transition: "opacity 0.8s ease 1.5s",
            }}
          >
            <span>Mês 1</span>
            <span>Mês 3</span>
            <span>Mês 5</span>
            <span>Mês 7</span>
            <span>Mês 9</span>
          </div>
        </div>
      </div>
    </section>
  );
}
