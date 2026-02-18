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

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

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
      // Email notification via Resend
      fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: "Lead via Assistente",
          telefone,
          interesse_tipo: `Estudo ${tipologia} ${area}m²`,
          mensagem: `Tipologia: ${tipologia}, Área: ${area}m², Localização: ${localizacao}`,
          origem: "assistente_contextual",
        }),
      }).catch(() => {});
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
                    <option value="T1" className="bg-gray-900 text-white">T1</option>
                    <option value="T2" className="bg-gray-900 text-white">T2</option>
                    <option value="T3" className="bg-gray-900 text-white">T3</option>
                    <option value="T4" className="bg-gray-900 text-white">T4</option>
                    <option value="T5" className="bg-gray-900 text-white">T5</option>
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

            {phase === "done" && (() => {
              const whatsappMsg = encodeURIComponent(
                `Olá! Preenchi o formulário no site e gostaria de receber o meu estudo técnico:\n` +
                `- Tipologia: ${tipologia}\n` +
                `- Área: ${area} m²\n` +
                (localizacao ? `- Localização: ${localizacao}\n` : "")
              );
              const whatsappUrl = `https://api.whatsapp.com/send/?phone=351930423456&text=${whatsappMsg}&type=phone_number&app_absent=0`;
              return (
                <div className="text-center py-6">
                  <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
                  <p className="text-white font-bold text-lg mb-1">
                    Pedido registado com sucesso!
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Clique abaixo para receber o seu estudo via WhatsApp:
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:brightness-110"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Falar com Consultor LSF
                  </a>
                  <button
                    onClick={handleReset}
                    className="text-gray-500 text-xs mt-3 hover:text-white transition-colors cursor-pointer"
                  >
                    Gerar outro estudo
                  </button>
                </div>
              );
            })()}

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
