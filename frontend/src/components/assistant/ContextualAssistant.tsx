"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Cpu, CheckCircle, Loader2 } from "lucide-react";

/* ─── Route-based contextual messages ─── */
interface RouteContext {
  headline: string;
  sub: string;
}

const routeContexts: Record<string, RouteContext> = {
  preco: {
    headline: "Está a tentar perceber o custo real da sua moradia?",
    sub: "Posso calcular com base na sua área e localização real.",
  },
  "quanto-custa": {
    headline: "Quer saber quanto custa construir a sua casa em LSF?",
    sub: "Gere um estudo personalizado em menos de 2 minutos.",
  },
  financiamento: {
    headline: "Vai precisar de crédito habitação?",
    sub: "Posso estimar investimento total + prazo de execução.",
  },
  metodologia: {
    headline: "Quer ver esta tecnologia aplicada ao seu projeto?",
    sub: "Gere uma planta personalizada com orçamento real.",
  },
  processo: {
    headline: "Pronto para iniciar o seu processo de construção?",
    sub: "Comece com um estudo técnico adaptado à sua realidade.",
  },
  blog: {
    headline: "Quer aplicar este conhecimento no seu projeto real?",
    sub: "Posso gerar um estudo técnico personalizado.",
  },
  default: {
    headline: "Descubra o custo real da sua casa em LSF",
    sub: "Estudo técnico personalizado gerado em minutos.",
  },
};

function getContext(pathname: string): RouteContext {
  for (const [key, ctx] of Object.entries(routeContexts)) {
    if (key !== "default" && pathname.includes(key)) return ctx;
  }
  return routeContexts.default;
}

/* ─── Terminal steps ─── */
const terminalSteps = [
  "Analisando estrutura...",
  "Consultando base técnica...",
  "Extraindo quantitativos...",
  "Preparando estudo...",
];

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://casas-lsf-backend.dy3pb5.easypanel.host";

type Phase = "form" | "processing" | "done" | "error";

export default function ContextualAssistant() {
  const pathname = usePathname();
  const ctx = getContext(pathname);
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  /* Form state */
  const [telefone, setTelefone] = useState("");
  const [area, setArea] = useState("");
  const [tipologia, setTipologia] = useState("T3");
  const [localizacao, setLocalizacao] = useState("");

  /* Animation state */
  const [phase, setPhase] = useState<Phase>("form");
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);

  /* Scroll reveal */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Terminal animation */
  useEffect(() => {
    if (phase !== "processing") return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < terminalSteps.length) {
        setVisibleSteps((prev) => [...prev, terminalSteps[i]]);
        i++;
      } else {
        clearInterval(interval);
        submitToApi();
      }
    }, 700);
    return () => clearInterval(interval);
  }, [phase]);

  async function submitToApi() {
    try {
      await fetch(`${API_URL}/api/gerar-estudo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefone,
          area: Number(area),
          tipologia,
          localizacao,
          pisos: 1,
          estilo: "moderno",
        }),
      });
      setPhase("done");
    } catch {
      setPhase("error");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!telefone || !area) return;
    setVisibleSteps([]);
    setPhase("processing");
  }

  function handleReset() {
    setPhase("form");
    setVisibleSteps([]);
  }

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${revealed ? "revealed" : ""}`}
    >
      <div className="assistant-card">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* ─── Left: Contextual message ─── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                Assistente Inteligente
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3 leading-tight">
              {ctx.headline}
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {ctx.sub}
            </p>
          </div>

          {/* ─── Right: Micro form / Terminal / Success ─── */}
          <div>
            {phase === "form" && (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Telefone *"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                    className="assistant-input"
                  />
                  <input
                    type="number"
                    placeholder="Área m² *"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                    min={40}
                    max={600}
                    className="assistant-input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={tipologia}
                    onChange={(e) => setTipologia(e.target.value)}
                    className="assistant-input"
                  >
                    <option value="T1">T1</option>
                    <option value="T2">T2</option>
                    <option value="T3">T3</option>
                    <option value="T4">T4</option>
                    <option value="T5">T5</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Localização"
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                    className="assistant-input"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2"
                >
                  Gerar Estudo Inteligente <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {phase === "processing" && (
              <div className="assistant-terminal">
                {visibleSteps.map((step, i) => (
                  <div key={i} className="terminal-line">
                    <span className="text-blue-400">{">"}</span>{" "}
                    <span className="text-gray-300">{step}</span>
                  </div>
                ))}
                {visibleSteps.length < terminalSteps.length && (
                  <div className="flex items-center gap-2 mt-2">
                    <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
                    <span className="text-xs text-gray-500">A processar...</span>
                  </div>
                )}
              </div>
            )}

            {phase === "done" && (
              <div className="text-center py-6">
                <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <p className="text-white font-bold text-lg mb-1">
                  Estudo enviado para o seu WhatsApp
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Vai receber o estudo completo em instantes.
                </p>
                <button
                  onClick={handleReset}
                  className="text-blue-400 text-sm font-semibold hover:underline cursor-pointer"
                >
                  Gerar outro estudo
                </button>
              </div>
            )}

            {phase === "error" && (
              <div className="text-center py-6">
                <p className="text-red-400 font-bold mb-2">
                  Ocorreu um erro. Tente novamente.
                </p>
                <button
                  onClick={handleReset}
                  className="text-blue-400 text-sm font-semibold hover:underline cursor-pointer"
                >
                  Tentar novamente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
