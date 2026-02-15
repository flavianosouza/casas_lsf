import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InlineCtaProps {
  searchIntent?: string | null;
}

const CTA_CONTENT: Record<string, { title: string; text: string; href: string; button: string }> = {
  transacional: {
    title: "Quer um orçamento personalizado?",
    text: "Gere agora um estudo técnico preliminar gratuito para o seu projeto LSF.",
    href: "/simulador",
    button: "Gerar Estudo Técnico",
  },
  comercial: {
    title: "Compare preços de construção LSF",
    text: "Use o nosso simulador gratuito e descubra quanto custa o seu projeto em menos de 2 minutos.",
    href: "/simulador",
    button: "Simular Preços",
  },
  informacional: {
    title: "Quer saber quanto custaria a sua casa em LSF?",
    text: "Gere um estudo preliminar gratuito com estimativa de custos para o seu projeto.",
    href: "/simulador",
    button: "Simular Grátis",
  },
};

export default function InlineCta({ searchIntent }: InlineCtaProps) {
  const content = CTA_CONTENT[searchIntent || "informacional"] || CTA_CONTENT.informacional;

  return (
    <div className="my-10 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 not-prose">
      <p className="text-white font-bold text-lg mb-2">{content.title}</p>
      <p className="text-gray-400 text-sm mb-4">{content.text}</p>
      <Link
        href={content.href}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-500 text-white text-sm font-bold hover:bg-blue-400 transition-colors"
      >
        {content.button} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
