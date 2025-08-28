import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { contentBlocks } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const rows = await db
    .select()
    .from(contentBlocks)
    .orderBy(desc(contentBlocks.updatedAt));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { slug, data } = await req.json();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  await db
    .insert(contentBlocks)
    .values({ slug, data })
    .onConflictDoUpdate({
      target: contentBlocks.slug,
      set: { data, updatedAt: new Date() },
    });

  return NextResponse.json({ ok: true });
}
