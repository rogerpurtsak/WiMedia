import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { admins } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSessionResponse } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ ok:false, error:"Missing creds" }, { status: 400 });

  const [user] = await db.select().from(admins).where(eq(admins.email, String(email))).limit(1);
  if (!user) return NextResponse.json({ ok:false, error:"Invalid login" }, { status: 401 });

  const ok = await bcrypt.compare(String(password), user.hash);
  if (!ok) return NextResponse.json({ ok:false, error:"Invalid login" }, { status: 401 });
  
  return createSessionResponse({ sub: String(user.id), email: user.email });
}
