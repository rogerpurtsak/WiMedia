import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";

export async function GET() {
  const session = await readSession();
  if (!session) return NextResponse.json({ authenticated:false });
  return NextResponse.json({ authenticated:true, email: session.email });
}
