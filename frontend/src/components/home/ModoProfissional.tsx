"use client";

import { useState } from "react";
import { ChevronDown, Scale, Wrench, Landmark } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const items = [
  {
    icon: Scale,
    title: "Licenciamento Completo",
    summary: "13 especialidades obrigatórias — Comunicação Prévia tratada por nós.",
    detail:
      "Tratamos de todo o processo junto da Câmara Municipal: projeto de arquitetura, estabilidade, térmica, acústica, telecomunicações, gás, eletricidade, água e esgotos, PPCI, e todas as restantes especialidades. Proposta fixa de 10.000\u00A0EUR até 200\u00A0m\u00B2 com prazo de 4-5 meses.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Wrench,
    title: "Construção LSF Chave-na-Mão",
    summary: "Aço galvanizado, obra em 6-10 meses, garantia estrutural de 50 anos.",
    detail:
      "Estrutura em Light Steel Frame com perfis galvanizados a quente. Isolamento térmico e acústico superior, classe energética A+, resistência sísmica comprovada e ventos até 200\u00A0km/h. Até 90% dos materiais recicláveis — construção sustentável sem comprometer performance.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Landmark,
    title: "Financiamento Bancário",
    summary: "Bancos financiam LSF igual a alvenaria — CGD, Millennium, Novo Banco.",
    detail:
      "A construção LSF é aceite por todos os bancos portugueses para crédito habitação e construção. O nosso orçamento detalhado com caderno de encargos facilita a aprovação bancária. Apoiamos em todo o processo de financiamento.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export default function ModoProfissional() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-40 relative">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 mb-4">
            Serviço Completo
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Modo <span className="text-gradient">Profissional</span>
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Do papel à casa construída. Tudo tratado por uma equipa com alvará IMPIC.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center gap-5 p-6 md:p-8 text-left cursor-pointer"
                  >
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center ${item.color} shrink-0`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{item.summary}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pl-[5.5rem] md:pl-[6.5rem]">
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
