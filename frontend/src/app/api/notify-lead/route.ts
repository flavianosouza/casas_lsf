import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { nome, email, telefone, interesse_tipo, mensagem, origem } = body;

    if (!nome || !telefone) {
      return NextResponse.json(
        { error: "Nome e telefone são obrigatórios" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Casas LSF <leads@casaslsf.com>",
      to: ["orcamento@casaslsf.com"],
      subject: `Novo Lead: ${nome} — ${interesse_tipo || "Contacto"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #0a0a0a; padding: 24px; border-radius: 12px; border: 1px solid #1a2a3a;">
            <h2 style="color: #178FC6; margin: 0 0 20px 0; font-size: 20px;">
              Novo Lead — CASAS LSF
            </h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nome</td>
                <td style="padding: 8px 0; color: #fff; font-size: 16px; font-weight: bold;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefone</td>
                <td style="padding: 8px 0; color: #fff; font-size: 16px;">
                  <a href="tel:${telefone}" style="color: #178FC6; text-decoration: none;">${telefone}</a>
                </td>
              </tr>
              ${email ? `
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                <td style="padding: 8px 0; color: #fff; font-size: 16px;">
                  <a href="mailto:${email}" style="color: #178FC6; text-decoration: none;">${email}</a>
                </td>
              </tr>` : ""}
              ${interesse_tipo ? `
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Interesse</td>
                <td style="padding: 8px 0; color: #F07D17; font-size: 14px; font-weight: bold;">${interesse_tipo}</td>
              </tr>` : ""}
              ${mensagem ? `
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mensagem</td>
                <td style="padding: 8px 0; color: #ccc; font-size: 14px;">${mensagem}</td>
              </tr>` : ""}
              ${origem ? `
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Origem</td>
                <td style="padding: 8px 0; color: #666; font-size: 12px;">${origem}</td>
              </tr>` : ""}
            </table>

            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #1a2a3a;">
              <a href="https://wa.me/351${telefone.replace(/\D/g, "")}"
                 style="display: inline-block; background: #25D366; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Responder via WhatsApp
              </a>
            </div>
          </div>

          <p style="color: #555; font-size: 11px; margin-top: 16px; text-align: center;">
            Enviado automaticamente pelo sistema CASAS LSF
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Notify lead error:", err);
    return NextResponse.json(
      { error: "Erro ao enviar notificação" },
      { status: 500 }
    );
  }
}
