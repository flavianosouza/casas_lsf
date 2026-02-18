"use client";

import { useState, useEffect, useRef } from "react";
import { Users, FileText, Database, Calculator, HardHat } from "lucide-react";

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

/* ─── Sparkline SVG ─── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 72;
  const h = 22;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 2) - 1}`)
    .join(" ");

  return (
    <svg width={w} height={h} className="opacity-50 mt-2">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Metrics config ─── */
interface Metric {
  icon: typeof Users;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  sparkline: number[];
}

function buildSparkline(end: number): number[] {
  const steps = 10;
  return Array.from({ length: steps }, (_, i) =>
    Math.round((end * (i + 1)) / steps)
  );
}

const defaultMetrics: Metric[] = [
  { icon: Users, label: "Leads Ativos", value: 0, color: "#3b82f6", sparkline: [0] },
  { icon: FileText, label: "Plantas Geradas", value: 0, color: "#06b6d4", sparkline: [0] },
  { icon: Database, label: "Terrenos na Base", value: 0, color: "#3b82f6", sparkline: [0] },
  { icon: Calculator, label: "Orçamentos Gerados", value: 0, color: "#06b6d4", sparkline: [0] },
  { icon: HardHat, label: "Projetos em Análise", value: 0, color: "#3b82f6", sparkline: [0] },
];

export default function LiveEngineeringMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>(defaultMetrics);

  /* Fetch real data from backend API */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/metricas");
        if (res.ok) {
          const data = await res.json();
          setMetrics((prev) =>
            prev.map((m) => {
              let val = 0;
              if (m.label === "Leads Ativos") val = data.total_leads || 0;
              if (m.label === "Plantas Geradas") val = data.plantas_geradas || 0;
              if (m.label === "Terrenos na Base") val = data.terrenos || 0;
              if (m.label === "Orçamentos Gerados") val = data.orcamentos_gerados || 0;
              if (m.label === "Projetos em Análise") val = data.projetos_analise || 0;
              return val > 0 ? { ...m, value: val, sparkline: buildSparkline(val) } : m;
            })
          );
        }
      } catch {
        /* fallback silently */
      }
    })();
  }, []);

  /* Intersection observer */
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
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-3">
            Dados em Tempo Real
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
            Motor de <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Engenharia Ativo</span>
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {metrics.map((m, i) => (
            <MetricCard key={i} metric={m} active={active} delay={i * 100} />
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
}

function MetricCard({
  metric,
  active,
  delay,
}: {
  metric: Metric;
  active: boolean;
  delay: number;
}) {
  const count = useCountUp(metric.value, 1200 + delay, active);
  const Icon = metric.icon;

  return (
    <div
      className="metric-card group"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${metric.color}15` }}
        >
          <Icon className="w-4 h-4" style={{ color: metric.color }} />
        </div>
        <Sparkline data={metric.sparkline} color={metric.color} />
      </div>
      <div className="text-2xl md:text-3xl font-black text-white tracking-tight">
        {count}
        {metric.suffix || ""}
      </div>
      <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 mt-1">
        {metric.label}
      </div>
    </div>
  );
}
