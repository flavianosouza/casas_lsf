"use client";

import { useState } from "react";
import { FileText, Send, X, Loader2, CheckCircle, Download } from "lucide-react";
import { trackGerarEstudo } from "@/lib/analytics";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface EstudoResult {
  status: string;
  pdf?: string | null;
  resumo?: string | null;
  prazo?: string | null;
  message?: string | null;
}

export default function GerarEstudoButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstudoResult | null>(null);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    tipologia: "T3",
    area: 140,
    pisos: 1,
    localizacao: "",
    estilo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim() || !form.localizacao.trim()) return;

    setLoading(true);
    trackGerarEstudo(form.tipologia, form.area.toString());
    try {
      const resp = await fetch(`${API_URL}/api/gerar-estudo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Email notification via Resend
      fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          interesse_tipo: `Estudo Técnico ${form.tipologia} ${form.area}m²`,
          mensagem: `Tipologia: ${form.tipologia}, Área: ${form.area}m², Pisos: ${form.pisos}, Localização: ${form.localizacao}, Estilo: ${form.estilo}`,
          origem: "gerar_estudo",
        }),
      }).catch(() => {});

      if (resp.ok) {
        const data: EstudoResult = await resp.json();
        setResult(data);
      } else {
        setResult({
          status: "sucesso",
          message: "O seu pedido foi recebido. Entraremos em contacto brevemente.",
        });
      }
    } catch {
      setResult({
        status: "sucesso",
        message: "O seu pedido foi recebido. Entraremos em contacto brevemente.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="glass-card p-8 my-8 border border-green-500/20">
        <div className="text-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Pedido Enviado com Sucesso!
          </h3>
        </div>

        {result.resumo && (
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Resumo do Orçamento</div>
            <div className="text-white font-bold">{result.resumo}</div>
          </div>
        )}

        {result.prazo && (
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Prazo de Execução</div>
            <div className="text-white font-bold">{result.prazo}</div>
          </div>
        )}

        {result.pdf && (
          <a
            href={result.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors mb-4"
          >
            <Download className="w-5 h-5" /> Descarregar Estudo Técnico (PDF)
          </a>
        )}

        <p className="text-gray-400 text-sm text-center">
          {result.message || "A nossa equipa irá contactá-lo brevemente com mais detalhes."}
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="my-8 text-center">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors text-lg"
        >
          <FileText className="w-5 h-5" /> Gerar Estudo Técnico Gratuito
        </button>
        <p className="text-gray-500 text-xs mt-2">
          Planta + Mapa de Quantidades + Orçamento + Cronograma
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 my-8 border border-blue-500/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          Gerar Estudo Técnico Gratuito
        </h3>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Tipologia *</label>
            <select
              value={form.tipologia}
              onChange={(e) => setForm({ ...form, tipologia: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="T1">T1</option>
              <option value="T2">T2</option>
              <option value="T3">T3</option>
              <option value="T4">T4</option>
              <option value="T5">T5+</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Área (m²) *</label>
            <input
              type="number"
              required
              min={40}
              max={1000}
              value={form.area}
              onChange={(e) => setForm({ ...form, area: parseInt(e.target.value) || 100 })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Pisos *</label>
            <select
              value={form.pisos}
              onChange={(e) => setForm({ ...form, pisos: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value={1}>1 Piso</option>
              <option value={2}>2 Pisos</option>
              <option value={3}>3 Pisos</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Localização *</label>
            <input
              type="text"
              required
              value={form.localizacao}
              onChange={(e) => setForm({ ...form, localizacao: e.target.value })}
              placeholder="Ex: Sintra, Lisboa"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Estilo (opcional)</label>
          <select
            value={form.estilo}
            onChange={(e) => setForm({ ...form, estilo: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50"
          >
            <option value="">Selecionar estilo</option>
            <option value="moderno">Moderno</option>
            <option value="classico">Clássico</option>
            <option value="minimalista">Minimalista</option>
            <option value="rustico">Rústico</option>
          </select>
        </div>

        {/* Contact details */}
        <div className="border-t border-white/5 pt-4 mt-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Contacto</div>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Nome *</label>
          <input
            type="text"
            required
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            placeholder="O seu nome"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Telefone *</label>
            <input
              type="tel"
              required
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              placeholder="+351 9XX XXX XXX"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email (opcional)</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          {loading ? "A gerar estudo..." : "Gerar Estudo Técnico"}
        </button>
        <p className="text-xs text-gray-600 text-center">
          Ao submeter, a equipa de engenharia irá processar os dados e gerar um
          relatório técnico com Planta, Mapa de Quantidades, Orçamento e Cronograma.
        </p>
      </form>
    </div>
  );
}
