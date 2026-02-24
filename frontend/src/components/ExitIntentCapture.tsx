"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { trackExitIntentShown, trackExitIntentConvert } from "@/lib/analytics";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function ExitIntentCapture() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "" });

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !show) {
      // Check if already dismissed this session
      const dismissed = sessionStorage.getItem("exit_intent_dismissed");
      if (!dismissed) {
        setShow(true);
        trackExitIntentShown();
      }
    }
  }, [show]);

  useEffect(() => {
    // Only add listener after a delay (don't show immediately)
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 15000); // 15 seconds delay

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("exit_intent_dismissed", "1");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim()) return;

    setLoading(true);
    try {
      const leadData = {
        nome: form.nome,
        telefone: form.telefone,
        origem: "exit_intent",
        interesse_tipo: "orcamento",
        mensagem: `Lead capturado via exit intent em ${window.location.pathname}`,
      };
      await fetch(`${API_URL}/api/leads/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      // Email notification via Resend
      fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      }).catch(() => {});
      setSuccess(true);
      trackExitIntentConvert();
      setTimeout(dismiss, 3000);
    } catch {
      dismiss();
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative glass-card p-8 max-w-md w-full border border-blue-500/20 animate-fade-in">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Obrigado!</h3>
            <p className="text-gray-400 text-sm">
              Entraremos em contacto brevemente.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-white mb-2">
              Espere! Não saia sem o seu orçamento gratuito.
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Deixe o seu contacto e receba uma estimativa de custos
              personalizada para o seu projeto em LSF.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                placeholder="O seu nome"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
              />
              <input
                type="tel"
                required
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                placeholder="+351 9XX XXX XXX"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {loading ? "A enviar..." : "Quero o Meu Orçamento"}
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="w-full text-center text-gray-600 text-xs hover:text-gray-400 transition-colors"
              >
                Não, obrigado
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
