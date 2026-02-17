"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

/* ─── Composição real parede exterior LSF (Caderno de Encargos) ─── */
const camadas = [
  {
    name: "Acabamento ETICS",
    espessura: "6 mm",
    cor: "#a855f7",
    desc: "Sistema ETICS com pintura exterior texturada",
  },
  {
    name: "Placa OSB",
    espessura: "12 mm",
    cor: "#b4944e",
    desc: "Contraplacado estrutural OSB/3",
  },
  {
    name: "Barreira pára-vento",
    espessura: "—",
    cor: "#eab308",
    desc: "Membrana permeável ao vapor",
  },
  {
    name: "Perfis C90 + Lã de Rocha",
    espessura: "90 mm",
    cor: "#3b82f6",
    desc: "Aço Z275 1.2mm @400mm · Lã 40kg/m³",
  },
  {
    name: "Barreira de vapor",
    espessura: "—",
    cor: "#f59e0b",
    desc: "Polietileno 200µm",
  },
  {
    name: "Gesso cartonado",
    espessura: "13 mm",
    cor: "#94a3b8",
    desc: "Placa hidrófuga BA13",
  },
];

/* ─── Composição real cobertura LSF ─── */
const cobertura = [
  { name: "Painel sandwich / Telha", espessura: "40 mm" },
  { name: "Subtelha", espessura: "—" },
  { name: "Isolamento lã de rocha", espessura: "150 mm" },
  { name: "Barreira de vapor", espessura: "—" },
  { name: "Treliças LSF — Perfis C150", espessura: "Vão até 12m" },
];

/* ─── Especificações técnicas reais ─── */
const specs = [
  { label: "Perfis paredes", value: "C90", detail: "Aço galvanizado Z275" },
  { label: "Espessura aço", value: "1.2 mm", detail: "Chapa conformada a frio" },
  { label: "Galvanização", value: "Z275", detail: "275 g/m² dupla face" },
  { label: "Espaçamento", value: "@400 mm", detail: "Entre montantes (eixo)" },
  { label: "Isolamento paredes", value: "90 mm", detail: "Lã de rocha 40 kg/m³" },
  { label: "Coef. térmico U", value: "≤ 0.35", detail: "W/m²K (REH)" },
  { label: "Pé-direito", value: "2.800 mm", detail: "Interior livre" },
  { label: "Perfis cobertura", value: "C150", detail: "Treliças, pendente ≥ 5%" },
];

export default function StructuralSketchAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"parede" | "cobertura">("parede");

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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Detalhe construtivo */}
          <div ref={ref}>
            <ScrollReveal>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-4">
                Detalhe Construtivo
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-2">
                Sistema{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  LSF
                </span>
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                Composição real das paredes e cobertura conforme Caderno de
                Encargos — cada camada com função estrutural, térmica ou de
                estanquidade.
              </p>
            </ScrollReveal>

            {/* Tabs */}
            <div className="flex gap-1 mb-6">
              {(
                [
                  { key: "parede", label: "Parede Exterior" },
                  { key: "cobertura", label: "Cobertura" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                      : "bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Wall section detail */}
            {activeTab === "parede" && (
              <div
                className="space-y-1"
                style={{
                  opacity: active ? 1 : 0,
                  transition: "opacity 0.6s ease 0.3s",
                }}
              >
                {/* Exterior label */}
                <div className="text-[9px] uppercase tracking-widest text-gray-600 font-bold pb-1 pl-1">
                  Exterior
                </div>

                {camadas.map((c, i) => {
                  const isMain = c.name.includes("C90");
                  return (
                    <div
                      key={i}
                      className="group"
                      style={{
                        opacity: active ? 1 : 0,
                        transform: active
                          ? "translateX(0)"
                          : "translateX(-20px)",
                        transition: `all 0.4s cubic-bezier(0.4,0,0.2,1) ${300 + i * 120}ms`,
                      }}
                    >
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                          isMain
                            ? "bg-blue-500/[0.06] border-blue-500/20 hover:border-blue-500/40"
                            : "bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]"
                        }`}
                      >
                        {/* Color bar */}
                        <div
                          className={`w-1.5 self-stretch rounded-full shrink-0 ${
                            isMain ? "min-h-[48px]" : "min-h-[8px]"
                          }`}
                          style={{ backgroundColor: c.cor + (isMain ? "99" : "66") }}
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold ${
                                isMain ? "text-blue-300" : "text-gray-300"
                              }`}
                            >
                              {c.name}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500">
                              {c.espessura}
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-500 mt-0.5">
                            {c.desc}
                          </div>
                          {isMain && (
                            <div className="mt-2 flex gap-3">
                              {[
                                "C90",
                                "Z275",
                                "1.2mm",
                                "@400mm",
                                "40kg/m³",
                              ].map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono font-bold"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Section bar visual */}
                        <div
                          className="hidden md:block h-full rounded shrink-0"
                          style={{
                            width: isMain ? "60px" : c.espessura === "—" ? "2px" : "16px",
                            minHeight: isMain ? "48px" : "8px",
                            backgroundColor: c.cor + "33",
                            border: `1px solid ${c.cor}44`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Interior label */}
                <div className="text-[9px] uppercase tracking-widest text-gray-600 font-bold pt-1 pl-1">
                  Interior
                </div>

                {/* Thermal performance */}
                <div
                  className="mt-4 p-3 rounded-lg bg-green-500/[0.04] border border-green-500/10"
                  style={{
                    opacity: active ? 1 : 0,
                    transition: "opacity 0.5s ease 1.4s",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-green-400/80 font-bold">
                      Desempenho térmico
                    </span>
                    <span className="text-sm font-black text-green-400 font-mono">
                      U ≤ 0.35 W/m²K
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    Conforme REH — Regulamento de Desempenho Energético
                  </div>
                </div>
              </div>
            )}

            {/* Roof section detail */}
            {activeTab === "cobertura" && (
              <div
                className="space-y-1"
                style={{
                  opacity: active ? 1 : 0,
                  transition: "opacity 0.6s ease 0.3s",
                }}
              >
                <div className="text-[9px] uppercase tracking-widest text-gray-600 font-bold pb-1 pl-1">
                  Exterior (topo)
                </div>

                {cobertura.map((c, i) => {
                  const isMain = c.name.includes("C150");
                  return (
                    <div
                      key={i}
                      style={{
                        opacity: active ? 1 : 0,
                        transform: active
                          ? "translateX(0)"
                          : "translateX(-20px)",
                        transition: `all 0.4s cubic-bezier(0.4,0,0.2,1) ${300 + i * 120}ms`,
                      }}
                    >
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                          isMain
                            ? "bg-cyan-500/[0.06] border-cyan-500/20"
                            : "bg-white/[0.02] border-white/[0.04]"
                        }`}
                      >
                        <div
                          className="w-1.5 self-stretch rounded-full shrink-0"
                          style={{
                            backgroundColor: isMain
                              ? "rgba(6,182,212,0.5)"
                              : "rgba(148,163,184,0.3)",
                            minHeight: isMain ? "40px" : "8px",
                          }}
                        />
                        <div className="flex-1">
                          <span
                            className={`text-xs font-bold ${
                              isMain ? "text-cyan-300" : "text-gray-300"
                            }`}
                          >
                            {c.name}
                          </span>
                          {isMain && (
                            <div className="mt-1.5 flex gap-3">
                              {["C150", "Vão 12m", "Pendente ≥5%"].map(
                                (tag) => (
                                  <span
                                    key={tag}
                                    className="text-[8px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono font-bold"
                                  >
                                    {tag}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">
                          {c.espessura}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="text-[9px] uppercase tracking-widest text-gray-600 font-bold pt-1 pl-1">
                  Interior (teto)
                </div>
              </div>
            )}
          </div>

          {/* Right — Specs grid */}
          <div>
            <ScrollReveal delay={200}>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-4">
                Especificações Técnicas
              </div>
              <h3 className="text-xl font-black tracking-tight text-white mb-6">
                Dados de Projeto
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-2">
              {specs.map((s, i) => (
                <div
                  key={s.label}
                  className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:border-cyan-500/20 transition-all"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active
                      ? "translateY(0)"
                      : "translateY(16px)",
                    transition: `all 0.4s ease ${400 + i * 100}ms`,
                  }}
                >
                  <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                    {s.label}
                  </div>
                  <div className="text-sm font-black text-white mt-0.5 font-mono">
                    {s.value}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {s.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Total wall thickness */}
            <div
              className="mt-4 p-4 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-white/[0.06]"
              style={{
                opacity: active ? 1 : 0,
                transition: "opacity 0.5s ease 1.5s",
              }}
            >
              <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-3">
                Espessura total da parede exterior
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black text-white font-mono">
                  ~125
                </span>
                <span className="text-sm text-gray-400 mb-0.5">mm</span>
              </div>
              <div className="mt-3 flex gap-1">
                {camadas.map((c, i) => (
                  <div key={i} className="flex-1 group relative">
                    <div
                      className="h-3 rounded-sm transition-all group-hover:h-4"
                      style={{
                        backgroundColor: c.cor + "66",
                        border: `1px solid ${c.cor}33`,
                      }}
                    />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] text-gray-600 font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {c.espessura}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6 text-[8px] text-gray-600">
                <span>EXT</span>
                <span>INT</span>
              </div>
            </div>

            {/* CE badge */}
            <div
              className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
              style={{
                opacity: active ? 1 : 0,
                transition: "opacity 0.5s ease 1.8s",
              }}
            >
              <span className="text-[8px] px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 font-black uppercase tracking-wider">
                CE
              </span>
              <div>
                <div className="text-[10px] text-gray-300 font-semibold">
                  Caderno de Encargos incluído
                </div>
                <div className="text-[9px] text-gray-500">
                  Especificação técnica detalhada por composição
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
