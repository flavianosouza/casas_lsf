import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/metricas`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      return NextResponse.json(await res.json());
    }
  } catch {
    /* fallback below */
  }

  return NextResponse.json({
    total_leads: 0,
    plantas_geradas: 0,
    terrenos: 0,
    composicoes_tecnicas: 0,
    projetos_analise: 0,
    artigos: 0,
  });
}
