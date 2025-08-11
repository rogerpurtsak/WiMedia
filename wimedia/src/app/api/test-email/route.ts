import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASS;
    const to = process.env.CONTACT_TO;

    if (!user || !pass || !to) {
      return NextResponse.json({ ok: false, error: "Missing envs" }, { status: 500 });
    }

    // Try STARTTLS (587). If it times out, switch to 465/secure: true.
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user, pass },
      connectionTimeout: 15000,
    });

    const info = await transporter.sendMail({
      from: `"Website" <${user}>`,
      to,
      subject: "Test email from Vercel",
      text: "If you see this, SMTP works in production.",
    });

    return NextResponse.json({ ok: true, id: info.messageId });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }
}
