import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Casas LSF - Artigo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://casas-lsf-backend.dy3pb5.easypanel.host";

const CATEGORIAS_LABELS: Record<string, string> = {
  "construcao-lsf": "Construção LSF",
  "precos-construcao": "Preços de Construção",
  "casas-modulares": "Casas Modulares",
  "credito-habitacao": "Crédito Habitação",
  "dicas-construcao": "Dicas de Construção",
  remodelacao: "Remodelação",
  "terrenos-licencas": "Terrenos e Licenças",
  "icf-plastbau": "Construção ICF",
  acabamentos: "Acabamentos",
  "telhados-coberturas": "Telhados e Coberturas",
  betao: "Construção em Betão",
  isolamento: "Isolamento",
  "pavilhoes-garagens": "Pavilhões e Garagens",
  "casas-madeira": "Casas de Madeira",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let titulo = "Casas LSF";
  let resumo = "";
  let categoria = "";
  let readTime = "";

  try {
    const res = await fetch(`${API_URL}/api/artigos/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const artigo = await res.json();
      titulo = artigo.titulo || titulo;
      resumo = artigo.resumo || "";
      categoria = artigo.categoria
        ? CATEGORIAS_LABELS[artigo.categoria] || artigo.categoria
        : "";
      if (artigo.read_time_minutes) {
        readTime = `${artigo.read_time_minutes} min leitura`;
      } else if (artigo.conteudo_html) {
        const words = artigo.conteudo_html
          .replace(/<[^>]*>/g, "")
          .split(/\s+/).length;
        readTime = `${Math.max(3, Math.ceil(words / 200))} min leitura`;
      }
    }
  } catch {
    /* fallback to defaults */
  }

  // Truncate
  if (titulo.length > 90) titulo = titulo.substring(0, 87) + "...";
  if (resumo.length > 160) resumo = resumo.substring(0, 157) + "...";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a2744 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top: categoria badge */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {categoria && (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: 700,
                  padding: "8px 20px",
                  borderRadius: "40px",
                  letterSpacing: "0.5px",
                }}
              >
                {categoria}
              </div>
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: titulo.length > 60 ? "40px" : "48px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "-1px",
              maxWidth: "900px",
            }}
          >
            {titulo}
          </div>

          {/* Resumo */}
          {resumo && (
            <div
              style={{
                fontSize: "20px",
                color: "#94a3b8",
                lineHeight: 1.5,
                maxWidth: "800px",
              }}
            >
              {resumo}
            </div>
          )}
        </div>

        {/* Bottom: branding */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Cyan line */}
          <div
            style={{
              width: "80px",
              height: "3px",
              backgroundColor: "#06b6d4",
              borderRadius: "2px",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo text */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "1px",
                }}
              >
                CASAS
              </span>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#3b82f6",
                  letterSpacing: "1px",
                }}
              >
                LSF
              </span>
            </div>

            {/* Meta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "16px",
                color: "#64748b",
              }}
            >
              <span>casaslsf.com</span>
              {readTime && (
                <>
                  <span style={{ color: "#334155" }}>·</span>
                  <span>{readTime}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
