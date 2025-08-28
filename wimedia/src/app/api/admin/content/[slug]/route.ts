import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { contentBlocks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  await db.delete(contentBlocks).where(eq(contentBlocks.slug, params.slug));
  return NextResponse.json({ ok: true });
}
