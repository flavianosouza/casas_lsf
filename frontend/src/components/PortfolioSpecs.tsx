import { Home, Layers, Ruler, CheckCircle } from "lucide-react";

interface Specs {
  tipologia: string | null;
  area_m2: number | null;
  num_pisos: number | null;
  tem_cave: boolean | null;
  tem_sotao: boolean | null;
  padrao_acabamento: string | null;
}

export default function PortfolioSpecs({ specs }: { specs: Specs }) {
  const rows: Array<{ label: string; value: string; icon: typeof Home }> = [];

  if (specs.tipologia) {
    rows.push({ label: "Tipologia", value: specs.tipologia, icon: Home });
  }
  if (specs.area_m2) {
    rows.push({
      label: "Área construção",
      value: `${specs.area_m2} m²`,
      icon: Ruler,
    });
  }
  if (specs.num_pisos !== null && specs.num_pisos !== undefined) {
    rows.push({
      label: "Número de pisos",
      value: `${specs.num_pisos}${specs.num_pisos === 1 ? " piso" : " pisos"}`,
      icon: Layers,
    });
  }
  rows.push({
    label: "Cave",
    value: specs.tem_cave ? "Sim" : "Não",
    icon: CheckCircle,
  });
  rows.push({
    label: "Sótão",
    value: specs.tem_sotao ? "Sim" : "Não",
    icon: CheckCircle,
  });
  if (specs.padrao_acabamento) {
    rows.push({
      label: "Padrão de acabamento",
      value: specs.padrao_acabamento,
      icon: CheckCircle,
    });
  }
  rows.push({
    label: "Sistema construtivo",
    value: "Light Steel Framing (LSF)",
    icon: Home,
  });
  rows.push({
    label: "Prazo de execução",
    value: "4 a 6 meses após licenciamento",
    icon: Layers,
  });

  return (
    <div className="glass-card p-8 md:p-10 mb-12">
      <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
        Especificações Técnicas
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/5"
          >
            <r.icon className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                {r.label}
              </div>
              <div className="text-white font-bold">{r.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
