import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const runtime = "nodejs";

export async function GET() {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS || !process.env.CONTACT_TO) {
      return NextResponse.json({ ok:false, error:"Missing envs" }, { status: 500 });
    }

    // Try TLS 587 first (some hosts prefer it in serverless)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,           // STARTTLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
      requireTLS: true,
      connectionTimeout: 15000,
    });

    const info = await transporter.sendMail({
      from: `"Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO,
      subject: "Test email from Vercel",
      text: "If you see this, SMTP works in production.",
    });

    return NextResponse.json({ ok: true, id: info.messageId });
  } catch (e: any) {
    return NextResponse.json({ ok:false, error: e?.message || "send failed" }, { status: 502 });
  }
}
