import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | CASAS LSF",
  description:
    "A página que procuras não existe. Volta à página inicial ou explora o nosso blog, simulador de custos e plantas LSF.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <div className="text-[120px] md:text-[180px] font-extrabold leading-none tracking-tight bg-gradient-to-r from-[#178FC6] to-[#F07D17] bg-clip-text text-transparent">
          404
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold">
          Página não encontrada
        </h1>
        <p className="mt-4 text-slate-400 leading-relaxed">
          A URL que escreveste não corresponde a nenhuma página deste site.
          Verifica se o endereço está correcto ou volta ao início.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base"
          >
            Voltar ao início
          </Link>
          <Link
            href="/blog"
            className="btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base"
          >
            Ler o blog
          </Link>
          <Link
            href="/simulador"
            className="btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base"
          >
            Pedir orçamento
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <Link
            href="/plantas"
            className="glass-card px-4 py-3 hover:border-[#178FC6]/40 transition"
          >
            Plantas LSF
          </Link>
          <Link
            href="/custos"
            className="glass-card px-4 py-3 hover:border-[#178FC6]/40 transition"
          >
            Custos m²
          </Link>
          <Link
            href="/como-funciona"
            className="glass-card px-4 py-3 hover:border-[#178FC6]/40 transition"
          >
            Como funciona
          </Link>
          <Link
            href="/sobre-obrasnet"
            className="glass-card px-4 py-3 hover:border-[#178FC6]/40 transition"
          >
            Sobre nós
          </Link>
        </div>
      </div>
    </main>
  );
}
