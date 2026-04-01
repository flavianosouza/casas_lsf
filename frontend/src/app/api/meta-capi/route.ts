import { NextResponse } from "next/server";

const PIXEL_ID = process.env.META_PIXEL_ID || "";
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN || "";

export async function POST(request: Request) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ error: "Meta CAPI not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { event_id, nome, telefone, utm_source, utm_medium, utm_campaign } = body;

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: event_id,
          action_source: "website",
          event_source_url: "https://casaslsf.com/analise-planta",
          user_data: {
            ph: telefone ? [telefone.replace(/\D/g, "")] : undefined,
            fn: nome ? [nome.toLowerCase().trim()] : undefined,
            country: ["pt"],
          },
          custom_data: {
            content_name: "analise_planta",
            content_category: "campanha",
            utm_source,
            utm_medium,
            utm_campaign,
          },
        },
      ],
    };

    const resp = await fetch(
      `https://graph.facebook.com/v22.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await resp.json();
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
