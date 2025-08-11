import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

const dbg = (...args:any[]) => console.log("[CONTACT]", ...args);

export async function POST(req: Request) {
  try {
    const { name, email, message, turnstileToken, honey = "" } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    if (honey) return NextResponse.json({ ok: true });

   const form = new URLSearchParams();
    form.append("secret", process.env.TURNSTILE_SECRET_KEY || "");
    form.append("response", turnstileToken || "");
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
    });
    const verify = await verifyRes.json();
    dbg("turnstile.verify", verify);
    if (!verify.success) {
    return NextResponse.json({ ok: false, error: "Bot check failed", details: verify }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New contact form: ${name}`,
      html: `
        <h3>Uus WiMeedia lehekülje sõnum</h3>
        <p><b>Nimi:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Sõnum:</b><br/>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {

    return NextResponse.json({ ok: false, error: "Email send failed" }, { status: 502 });
  }
}
