"use client";

import { useState, useRef, useCallback } from "react";
import { trackMetaLead, trackAnalisePlantaSubmit } from "@/lib/analytics";
import {
  Upload,
  CheckCircle,
  Clock,
  BarChart3,
  Shield,
  Zap,
  ChevronDown,
  X,
  FileText,
  Phone,
  User,
  Play,
} from "lucide-react";

/* ───────── dados comparação ───────── */
const COMPARISON = [
  { dim: "Custo/m²", alv: "950–1.600 €", lsf: "1.000–2.500 €", win: "Competitivo + desempenho" },
  { dim: "Prazo", alv: "14–26 meses", lsf: "6–14 meses", win: "Até −60 % no prazo" },
  { dim: "Isolamento", alv: "U ≈ 1,0–1,4", lsf: "U ≈ 0,28–0,35", win: "3–5× melhor" },
  { dim: "Classe energética", alv: "B a C", lsf: "A a A+", win: "Contas −40–60 %" },
  { dim: "Peso estrutura", alv: "1 200–2 500 kg/m²", lsf: "35–65 kg/m²", win: "−95 % mais leve" },
  { dim: "Sísmica", alv: "Rígida", lsf: "Flexível", win: "Superior em zona sísmica" },
  { dim: "Desperdício", alv: "15–25 %", lsf: "2–5 %", win: "−80 % desperdício" },
  { dim: "Fogo (EI)", alv: "EI 60–120", lsf: "EI 60–120", win: "Conforme regulamentos" },
];

const STEPS = [
  { icon: Upload, title: "Envie a planta", desc: "Foto, PDF ou screenshot — até do telemóvel" },
  { icon: Zap, title: "IA analisa em minutos", desc: "Extraímos tipologia, área e divisões automaticamente" },
  { icon: BarChart3, title: "Receba comparação", desc: "Relatório completo alvenaria vs LSF por WhatsApp" },
];

const STATS = [
  { value: "−60 %", label: "Prazo de construção" },
  { value: "A+", label: "Classe energética" },
  { value: "−95 %", label: "Peso da estrutura" },
  { value: "100 %", label: "Aço reciclável" },
];

const FAQS = [
  {
    q: "O LSF é seguro?",
    a: "Uma parede LSF com dupla placa de gesso cartonado e lã de rocha resiste ao fogo 90–120 minutos — igual a betão armado. O aço não arde (ponto de fusão 1 500 °C), e a estrutura é regulamentada pelo Eurocode 3.",
  },
  {
    q: "A minha planta precisa de ser alterada?",
    a: "Não. A planta mantém-se exactamente igual. O que muda é o sistema construtivo — de betão e tijolo para perfis de aço galvanizado. O projecto de arquitectura não sofre alterações.",
  },
  {
    q: "Quanto custa a conversão para LSF?",
    a: "Depende da área e dos acabamentos. Gama Base: 1 000–1 500 €/m², Gama Média: 1 400–2 000 €/m², Gama Premium: 1 800–2 500 €/m² (sem IVA). Valores calculados com base em projectos reais.",
  },
  {
    q: "Os bancos financiam casas em LSF?",
    a: "Sim. O Crédito Habitação funciona exactamente igual — o banco avalia pelo valor de mercado, não pelo método construtivo. Já temos vários clientes com financiamento aprovado.",
  },
  {
    q: "Quanto tempo demora a construção?",
    a: "T2 até 120 m²: 6–8 meses. T3 130–180 m²: 8–10 meses. T4 180–250 m²: 10–14 meses. Até 60 % mais rápido que alvenaria tradicional.",
  },
];

const GALLERY = [
  { title: "T3 Chave-na-Mão", loc: "Exterior acabado", img: "https://media.casaslsf.com/galeria/obra1-exterior-acabado.jpg" },
  { title: "T3 Fachada", loc: "Revestimento pedra", img: "https://media.casaslsf.com/galeria/obra1-fachada-revestimento.jpg" },
  { title: "Estrutura LSF", loc: "Interior com perfis e OSB", img: "https://media.casaslsf.com/galeria/obra1-estrutura-interior.jpg" },
  { title: "Interior em Obra", loc: "OSB e janelas instaladas", img: "https://media.casaslsf.com/galeria/obra1-interior-osb-janelas.jpg" },
  { title: "Perfis Galvanizados", loc: "Detalhe aço Z275", img: "https://media.casaslsf.com/galeria/obra2-perfis-lsf-detalhe.jpg" },
  { title: "Estrutura 2 Pisos", loc: "Obra 2 — vista exterior", img: "https://media.casaslsf.com/galeria/obra2-estrutura-2pisos.jpg" },
];

const TESTIMONIALS = [
  { name: "Ricardo M.", loc: "Sintra", text: "O empreiteiro pediu-me 240 mil em alvenaria. Com a OBRASNET ficou em 185 mil, entregue em 9 meses. A diferença no isolamento nota-se todos os dias.", tag: "Obra entregue" },
  { name: "Ana C.", loc: "Leiria", text: "Tinha medo que não fosse sólido. Depois de ver os dados técnicos e visitar uma obra, não tive dúvidas. A casa é perfeita.", tag: "Obra entregue" },
  { name: "Pedro S.", loc: "Algarve", text: "Vivo na Suíça e tratei tudo por WhatsApp. O Felipe respondeu a todas as dúvidas com dados concretos. Obra a decorrer dentro do prazo.", tag: "Em construção" },
];

/* ───────── componente ───────── */
export default function AnalisePlantaClient() {
  const [file, setFile] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  /* drag & drop */
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  /* phone mask */
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
    if (digits.length <= 3) setTelefone(digits);
    else if (digits.length <= 6) setTelefone(`${digits.slice(0, 3)} ${digits.slice(3)}`);
    else setTelefone(`${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`);
  };

  /* submit */
  const handleSubmit = async () => {
    if (!file || !nome.trim() || telefone.replace(/\s/g, "").length < 9 || !gdpr) return;
    setSending(true);

    // UTM params from URL
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source") || "";
    const utm_medium = params.get("utm_medium") || "";
    const utm_campaign = params.get("utm_campaign") || "";

    // Event ID for Meta dedup (Pixel + CAPI)
    const eventId = crypto.randomUUID();

    try {
      // Upload to FastAPI backend
      const formData = new FormData();
      formData.append("file", file);
      formData.append("nome", nome);
      formData.append("email", email);
      formData.append("telefone", telefone.replace(/\s/g, ""));
      formData.append("utm_source", utm_source);
      formData.append("utm_medium", utm_medium);
      formData.append("utm_campaign", utm_campaign);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const resp = await fetch(`${apiUrl}/api/analise-planta`, {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ detail: "Erro desconhecido" }));
        throw new Error(err.detail || `Erro ${resp.status}`);
      }

      // Track: Google Analytics
      trackAnalisePlantaSubmit();

      // Track: Meta Pixel (client-side)
      trackMetaLead(eventId);

      // Track: Meta CAPI (server-side dedup)
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_id: eventId, nome, telefone: telefone.replace(/\s/g, ""), utm_source, utm_medium, utm_campaign }),
      }).catch(() => {});

      setSent(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const valid = file && nome.trim().length >= 2 && telefone.replace(/\s/g, "").length >= 9 && gdpr;

  return (
    <main className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-32 pb-40 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Análise gratuita com IA
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Tem uma planta em alvenaria?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
              Descubra quanto poupa em LSF.
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
            Envie a sua planta e receba uma análise comparativa completa — custos, prazos e desempenho. A sua casa, o mesmo projecto. Só o sistema construtivo melhora.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button onClick={scrollToForm} className="px-8 py-3.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-lg transition-colors">
              Enviar Planta Grátis
            </button>
            <a href="#video" className="px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 text-gray-300 font-medium text-lg transition-colors inline-flex items-center gap-2 justify-center">
              <Play className="w-5 h-5" /> Ver como funciona
            </a>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { icon: Clock, text: "Resposta em 24h" },
              { icon: BarChart3, text: "Dados reais BOM" },
              { icon: Shield, text: "100 % gratuito" },
            ].map((b) => (
              <span key={b.text} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium">
                <b.icon className="w-4 h-4 text-blue-400" /> {b.text}
              </span>
            ))}
          </div>
        </div>
        {/* wave */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,60 L0,20 Q360,0 720,20 Q1080,40 1440,20 L1440,60 Z" fill="#0a0a0a" />
        </svg>
      </section>

      {/* ─── FORM ─── */}
      <section ref={formRef} className="relative z-10 max-w-lg mx-auto px-6 -mt-20 mb-16">
        <div className="glass-card p-8 border border-white/10">
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Planta recebida!</h3>
              <p className="text-gray-400 mb-6">Vamos analisar a sua planta e contactá-lo por WhatsApp nas próximas 24 horas.</p>
              <a
                href={`https://wa.me/351930423456?text=${encodeURIComponent("Olá! Acabei de enviar a minha planta para análise no site.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold transition-colors"
              >
                <Phone className="w-5 h-5" /> Falar com o Felipe no WhatsApp
              </a>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white text-center mb-1">Envie a sua planta</h2>
              <p className="text-gray-400 text-sm text-center mb-6">JPG, PNG ou PDF — foto do telemóvel serve</p>

              {/* upload area */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={() => fileRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-5 ${
                  file ? "border-green-500/50 bg-green-500/5" : "border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5"
                }`}
              >
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <div className="text-left">
                      <p className="text-white font-medium text-sm truncate max-w-[200px]">{file.name}</p>
                      <p className="text-gray-500 text-xs">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="ml-2 p-1 rounded-full hover:bg-white/10">
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ) : (
                  <>
                    <FileText className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                    <p className="text-white font-medium mb-1">Clique ou arraste a planta</p>
                    <p className="text-gray-500 text-xs">JPG, PNG ou PDF — máx. 10 MB</p>
                  </>
                )}
                <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={onFileChange} className="hidden" />
              </div>

              {/* nome */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  <User className="w-4 h-4 inline mr-1" />Nome
                </label>
                <input
                  type="text" value={nome} onChange={(e) => setNome(e.target.value)}
                  placeholder="O seu nome"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email (para receber a análise)
                </label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="o.seu@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* telefone */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  <Phone className="w-4 h-4 inline mr-1" />Telefone (WhatsApp)
                </label>
                <input
                  type="tel" value={telefone} onChange={handlePhone}
                  placeholder="912 345 678"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* gdpr */}
              <label className="flex gap-3 items-start mb-6 cursor-pointer">
                <input type="checkbox" checked={gdpr} onChange={(e) => setGdpr(e.target.checked)} className="mt-1 accent-blue-500 w-4 h-4 shrink-0" />
                <span className="text-xs text-gray-400 leading-relaxed">
                  Autorizo o tratamento dos meus dados para análise do projecto e contacto comercial.{" "}
                  <a href="/privacidade" className="text-blue-400 hover:underline">Política de Privacidade</a>
                </span>
              </label>

              {/* submit */}
              <button
                onClick={handleSubmit}
                disabled={!valid || sending}
                className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all ${
                  valid && !sending
                    ? "bg-blue-500 hover:bg-blue-400 text-white cursor-pointer"
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                }`}
              >
                {sending ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    A enviar...
                  </span>
                ) : (
                  "Receber Análise Gratuita →"
                )}
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">Sem compromisso. Resposta por WhatsApp.</p>
            </>
          )}
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Como funciona?</h2>
        <p className="text-gray-400 text-center mb-12">3 passos simples — sem compromisso</p>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="glass-card p-6 text-center group hover:border-blue-500/20 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
                <s.icon className="w-7 h-7 text-blue-400" />
              </div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Passo {i + 1}</span>
              <h3 className="text-white font-bold mt-2 mb-1">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── VIDEO ─── */}
      <section id="video" className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Veja em 2 minutos</h2>
        <p className="text-gray-400 text-center mb-8">Como a nossa IA analisa a sua planta</p>
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-900 shadow-2xl shadow-blue-500/10">
          {showVideo ? (
            <iframe
              src="https://www.youtube.com/embed/8wkAUnY4mKU?rel=0&modestbranding=1&start=5&controls=1&autoplay=1"
              title="Analise Minha Planta"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <button onClick={() => setShowVideo(true)} className="w-full h-full group relative">
              <img
                src="https://i.ytimg.com/vi/8wkAUnY4mKU/hqdefault.jpg"
                alt="Vídeo explicativo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Porquê mudar para LSF?</h2>
        <p className="text-gray-400 text-center mb-10">Números reais de projectos OBRASNET</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass-card p-6 text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-1">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COMPARACAO ─── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Alvenaria vs LSF</h2>
        <p className="text-gray-400 text-center mb-10">Comparação baseada em projectos reais OBRASNET</p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-500/10 border-b border-white/10">
                <th className="text-left p-4 text-gray-300 font-semibold">Dimensão</th>
                <th className="text-left p-4 text-gray-300 font-semibold">Alvenaria</th>
                <th className="text-left p-4 text-blue-400 font-semibold">LSF (OBRASNET)</th>
                <th className="text-left p-4 text-gray-300 font-semibold">Vantagem</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((r, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-white font-medium">{r.dim}</td>
                  <td className="p-4 text-gray-400">{r.alv}</td>
                  <td className="p-4 text-blue-300 font-medium">{r.lsf}</td>
                  <td className="p-4"><span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">{r.win}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── GALERIA ─── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Obras Reais OBRASNET</h2>
        <p className="text-gray-400 text-center mb-10">Por fora, impossível distinguir de alvenaria</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <div key={i} className="glass-card overflow-hidden group">
              <div className="aspect-[4/3] bg-gray-900 overflow-hidden">
                <img
                  src={g.img}
                  alt={`${g.title} — Obra OBRASNET`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm">{g.title}</h3>
                <p className="text-gray-500 text-xs">{g.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTEMUNHOS ─── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">O que dizem os clientes</h2>
        <p className="text-gray-400 text-center mb-10">Projectos reais, pessoas reais</p>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.loc}</p>
                  </div>
                </div>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{t.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Perguntas Frequentes</h2>
        <p className="text-gray-400 text-center mb-10">Dúvidas comuns sobre construção LSF</p>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-medium pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-blue-400 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-60" : "max-h-0"}`}>
                <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">A sua planta adapta-se ao LSF.<br />Descubra quanto poupa.</h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">Envie a sua planta e receba uma análise comparativa completa em 24 horas. Sem compromisso.</p>
            <button onClick={scrollToForm} className="px-10 py-4 rounded-full bg-white text-blue-600 font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg shadow-black/20">
              Enviar Planta Agora →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
