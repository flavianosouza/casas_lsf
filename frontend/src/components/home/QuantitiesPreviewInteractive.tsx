"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, FileText, Building2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

/* ─── Dados reais T3 150m² — Gama Média (gen_preview_final.py) ─── */
interface Item {
  desc: string;
  qtd: number;
  un: string;
  pu: number;
  caderno?: string;
}

interface Categoria {
  id: string;
  name: string;
  items: Item[];
}

const fmt = (v: number) =>
  v.toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const categorias: Categoria[] = [
  {
    id: "00",
    name: "Estaleiro e Preparação Terreno",
    items: [
      {
        desc: "Estaleiro de obra (montagem, WC prov., ligações)",
        qtd: 1,
        un: "vg",
        pu: 2000.0,
        caderno:
          "Inclui montagem de estaleiro completo com vedação perimetral, instalação sanitária provisória, ponto de água e energia, armazenamento de materiais e sinalização de segurança conforme regulamento.",
      },
      {
        desc: "Preparação terreno (limpeza, escavação, compactação)",
        qtd: 1.0,
        un: "vg",
        pu: 2500.0,
      },
    ],
  },
  {
    id: "01",
    name: "Fundações",
    items: [
      {
        desc: "Sapata corrida perimetral",
        qtd: 60,
        un: "ml",
        pu: 113.9,
        caderno:
          "Sapata em betão armado C25/30 com armadura A400NR, secção mínima 0.60×0.30m, incluindo escavação, cofragem, betonagem, vibração e cura. Recobrimento mínimo de 5cm conforme Eurocódigo 2.",
      },
      { desc: "Laje de fundação", qtd: 150, un: "m²", pu: 43.05 },
    ],
  },
  {
    id: "02",
    name: "Estrutura LSF — Paredes Exteriores",
    items: [
      {
        desc: "Parede exterior LSF completa — Gama Média",
        qtd: 222,
        un: "m²",
        pu: 101.31,
        caderno:
          "Perfis C90 aço galvanizado Z275 esp. 1.2mm @400mm, placa OSB 12mm, barreira pára-vento, isolamento lã de rocha 90mm (40kg/m³), barreira de vapor, gesso cartonado 13mm hidrófugo. U ≤ 0.35 W/m²K.",
      },
    ],
  },
  {
    id: "03",
    name: "Estrutura LSF — Paredes Interiores",
    items: [
      {
        desc: "Parede interior LSF — Gama Média",
        qtd: 126,
        un: "m²",
        pu: 64.37,
      },
      { desc: "Parede WC hidrófuga", qtd: 30, un: "m²", pu: 48.35 },
    ],
  },
  {
    id: "04",
    name: "Impermeabilizações",
    items: [
      {
        desc: "Impermeabilização de fundações",
        qtd: 165,
        un: "m²",
        pu: 22.0,
      },
      {
        desc: "Impermeabilização WCs (pavimento + paredes)",
        qtd: 3,
        un: "un",
        pu: 280.0,
      },
    ],
  },
  {
    id: "05",
    name: "Cobertura",
    items: [
      {
        desc: "Cobertura LSF completa — Gama Média",
        qtd: 157.5,
        un: "m²",
        pu: 70.24,
        caderno:
          "Treliças LSF com perfis C150, subtelha, isolamento lã de rocha 150mm, barreira de vapor, painel sandwich 40mm acabamento tipo telha ou chapa lacada. Pendente mínima 5%.",
      },
    ],
  },
  {
    id: "06",
    name: "Caixilharias e Portas",
    items: [
      {
        desc: "Janelas alumínio/PVC com vidro duplo",
        qtd: 13.44,
        un: "m²",
        pu: 380.0,
      },
      { desc: "Portas interiores", qtd: 7, un: "un", pu: 280.0 },
      { desc: "Portas exteriores de segurança", qtd: 2, un: "un", pu: 1200.0 },
      { desc: "Portão garagem seccional", qtd: 1, un: "un", pu: 2200.0 },
    ],
  },
  {
    id: "07",
    name: "Acabamentos",
    items: [
      { desc: "Pavimento — Gama Média", qtd: 150, un: "m²", pu: 77.26 },
      {
        desc: "Pintura interior",
        qtd: 432,
        un: "m²",
        pu: 22.93,
        caderno:
          "Tinta de água vinílica acetinada CIN ou equiv., sobre gesso cartonado. Inclui primário, selante e duas demãos de acabamento.",
      },
      { desc: "Pintura exterior (ETICS)", qtd: 222, un: "m²", pu: 11.03 },
    ],
  },
  {
    id: "08",
    name: "WC e Cozinha",
    items: [
      {
        desc: "WC completo — Gama Média",
        qtd: 3,
        un: "un",
        pu: 3343.5,
        caderno:
          "Louça sanitária completa: sanita suspensa, lavatório de pousar, base de duche, torneiras monocomando cromadas, acessórios. Revestimento cerâmico até ao teto.",
      },
      {
        desc: "Cozinha completa — Gama Média",
        qtd: 5,
        un: "ml",
        pu: 869.15,
      },
    ],
  },
  {
    id: "09",
    name: "Instalações Elétricas",
    items: [
      {
        desc: "Instalação elétrica por divisão",
        qtd: 8,
        un: "un",
        pu: 84.4,
      },
      { desc: "Quadro elétrico completo", qtd: 1, un: "un", pu: 667.0 },
    ],
  },
  {
    id: "10",
    name: "Instalações Hidráulicas",
    items: [
      { desc: "Canalização por WC", qtd: 3, un: "un", pu: 179.0 },
      {
        desc: "Rede abastecimento água geral",
        qtd: 1.33,
        un: "vg",
        pu: 5000.0,
      },
      {
        desc: "Rede drenagem esgotos domésticos",
        qtd: 1.33,
        un: "vg",
        pu: 4000.0,
      },
    ],
  },
  {
    id: "11",
    name: "Drenagem Águas Pluviais",
    items: [
      {
        desc: "Rede pluvial (caleiras, tubos queda, caixas, ligação)",
        qtd: 1.0,
        un: "vg",
        pu: 1800.0,
      },
    ],
  },
  {
    id: "12",
    name: "Telecomunicações ITED",
    items: [
      {
        desc: "Infraestrutura ITED completa (obrigatório)",
        qtd: 1.0,
        un: "vg",
        pu: 1500.0,
        caderno:
          "Conforme manual ITED 4ª edição. Inclui ATE, tubagem, cablagem par de cobre e fibra ótica, tomadas RJ45 e coaxial em todas as divisões.",
      },
    ],
  },
];

/* ─── Cálculos reais ─── */
const MARGEM = 0.35;
const AREA = 150;

function catSubtotal(cat: Categoria): number {
  return cat.items.reduce((s, it) => s + it.qtd * it.pu, 0);
}

const totalMateriais = categorias.reduce((s, c) => s + catSubtotal(c), 0);
const margemValor = totalMateriais * MARGEM;
const totalFinal = totalMateriais + margemValor;
const precoM2 = totalFinal / AREA;

export default function QuantitiesPreviewInteractive() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(2);

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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-black/20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-3">
            Modelo Profissional
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
            Mapa de{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Quantidades
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm">
            Exemplo real: Moradia T3 · 150 m² · Gama Média — 13 categorias com
            caderno de encargos, quantidades calculadas e preços de mercado.
          </p>
        </ScrollReveal>

        {/* Project info bar */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-gray-300 font-semibold">
                Moradia T3 — 150 m²
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-[10px] text-gray-500">
              <span>
                Acabamento:{" "}
                <strong className="text-gray-300">Gama Média</strong>
              </span>
              <span>
                Sistema: <strong className="text-gray-300">LSF</strong>
              </span>
              <span>
                Ref:{" "}
                <strong className="text-cyan-400/80">MQ-2026-0006</strong>
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Table header */}
        <div
          className="hidden md:grid grid-cols-12 gap-2 px-5 pb-3 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500"
          style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          <div className="col-span-5">Descrição</div>
          <div className="col-span-2 text-right">Quantidade</div>
          <div className="col-span-1 text-center">Un.</div>
          <div className="col-span-2 text-right">P. Unitário</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        <div ref={ref} className="space-y-1.5">
          {categorias.map((cat, i) => (
            <CategoriaRow
              key={cat.id}
              cat={cat}
              index={i}
              active={active}
              expanded={expandedIdx === i}
              onToggle={() => setExpandedIdx(expandedIdx === i ? null : i)}
            />
          ))}
        </div>

        {/* Summary */}
        <ScrollReveal delay={200}>
          <div className="mt-8 flex justify-end">
            <div className="w-full md:w-96 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-white/[0.06] p-5">
              <div className="flex justify-between py-2 text-xs text-gray-400 border-b border-white/[0.05]">
                <span>Materiais + Mão de Obra</span>
                <span className="font-mono text-gray-300">
                  {fmt(totalMateriais)} €
                </span>
              </div>
              <div className="flex justify-between py-2 text-xs text-gray-400 border-b border-white/[0.05]">
                <span>Encargos e Margem (35%)</span>
                <span className="font-mono text-gray-300">
                  {fmt(margemValor)} €
                </span>
              </div>
              <div className="flex justify-between pt-3 text-base font-black text-white">
                <span>TOTAL</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  {fmt(totalFinal)} €
                </span>
              </div>
              <div className="flex justify-between pt-1 text-[10px] text-gray-500">
                <span>Preço por m²</span>
                <span className="font-mono">{fmt(precoM2)} €/m²</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer info */}
        <ScrollReveal delay={300}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[10px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-cyan-400" />
              Gerado automaticamente pelo sistema de engenharia
            </span>
            <span>Preços reais de mercado</span>
            <span>Validade 30 dias</span>
            <span>Valores s/ IVA</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Linha de categoria ─── */
function CategoriaRow({
  cat,
  index,
  active,
  expanded,
  onToggle,
}: {
  cat: Categoria;
  index: number;
  active: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const delay = index * 80;
  const hasCaderno = cat.items.some((it) => it.caderno);
  const subtotal = catSubtotal(cat);

  return (
    <div
      className="quantities-row"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateX(0)" : "translateX(-16px)",
        transition: `all 0.4s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {/* Category header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3.5 md:p-4 cursor-pointer"
      >
        <ChevronRight
          className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform duration-300 ${
            expanded ? "rotate-90" : ""
          }`}
        />
        <span className="text-[10px] font-black text-cyan-500/60 w-6 shrink-0 tabular-nums">
          {cat.id}
        </span>
        <span className="text-sm font-bold text-gray-200 flex-1 text-left uppercase tracking-wide">
          {cat.name}
        </span>
        <span className="text-[10px] text-gray-500 font-mono mr-2">
          {cat.items.length} {cat.items.length === 1 ? "item" : "itens"}
        </span>
        {hasCaderno && (
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold uppercase tracking-wider mr-2">
            CE
          </span>
        )}
        <span className="text-xs font-bold text-gray-300 font-mono tabular-nums">
          {fmt(subtotal)} €
        </span>
      </button>

      {/* Expanded: line items */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          expanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-0.5">
          {cat.items.map((item, j) => {
            const total = item.qtd * item.pu;
            return (
              <div key={j}>
                {/* Item row */}
                <div className="grid grid-cols-12 gap-2 items-center py-2.5 px-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="col-span-12 md:col-span-5 text-xs text-gray-300">
                    {item.desc}
                  </div>
                  <div className="hidden md:block col-span-2 text-xs text-gray-400 text-right font-mono tabular-nums">
                    {fmt(item.qtd)}
                  </div>
                  <div className="hidden md:block col-span-1 text-xs text-gray-500 text-center font-mono">
                    {item.un}
                  </div>
                  <div className="hidden md:block col-span-2 text-xs text-gray-400 text-right font-mono tabular-nums">
                    {fmt(item.pu)} €
                  </div>
                  <div className="hidden md:block col-span-2 text-xs text-white/80 text-right font-mono font-semibold tabular-nums">
                    {fmt(total)} €
                  </div>
                  {/* Mobile price */}
                  <div className="md:hidden col-span-12 flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>
                      {fmt(item.qtd)} {item.un} × {fmt(item.pu)} €
                    </span>
                    <span className="text-white/70 font-semibold">
                      {fmt(total)} €
                    </span>
                  </div>
                </div>

                {/* Caderno de encargos */}
                {item.caderno && (
                  <div className="ml-2 mt-1 mb-2 pl-3 border-l-2 border-cyan-500/20">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-cyan-400/60 mb-0.5">
                      Caderno de Encargos
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      {item.caderno}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Subtotal row */}
          <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/[0.05] px-2">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
              Subtotal {cat.name}
            </span>
            <span className="text-xs font-bold text-cyan-400/80 font-mono tabular-nums">
              {fmt(subtotal)} €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
