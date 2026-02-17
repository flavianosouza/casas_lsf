"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Users, FileText, Database, Layers, HardHat } from "lucide-react";

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

const fallbackMetrics: Metric[] = [
  {
    icon: Users,
    label: "Leads Ativos",
    value: 49,
    color: "#3b82f6",
    sparkline: [5, 12, 8, 22, 18, 31, 28, 35, 42, 49],
  },
  {
    icon: FileText,
    label: "Plantas Geradas",
    value: 7,
    color: "#06b6d4",
    sparkline: [0, 1, 1, 2, 3, 3, 5, 5, 6, 7],
  },
  {
    icon: Database,
    label: "Terrenos na Base",
    value: 68,
    color: "#3b82f6",
    sparkline: [12, 18, 25, 32, 38, 45, 52, 58, 63, 68],
  },
  {
    icon: Layers,
    label: "Composições Técnicas",
    value: 847,
    color: "#06b6d4",
    sparkline: [320, 410, 480, 550, 620, 680, 720, 780, 820, 847],
  },
  {
    icon: HardHat,
    label: "Projetos em Análise",
    value: 12,
    color: "#3b82f6",
    sparkline: [2, 3, 5, 4, 7, 8, 6, 9, 10, 12],
  },
];

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://casas-lsf-backend.dy3pb5.easypanel.host";

export default function LiveEngineeringMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>(fallbackMetrics);

  /* Fetch real data */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/metricas`, {
          next: { revalidate: 300 },
        } as RequestInit);
        if (res.ok) {
          const data = await res.json();
          setMetrics((prev) =>
            prev.map((m) => {
              if (m.label === "Leads Ativos" && data.total_leads)
                return { ...m, value: data.total_leads };
              if (m.label === "Plantas Geradas" && data.plantas_geradas)
                return { ...m, value: data.plantas_geradas };
              if (m.label === "Terrenos na Base" && data.terrenos)
                return { ...m, value: data.terrenos };
              return m;
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
