import 'server-only';
import { db } from "@/db/client";
import { contentBlocks } from "@/db/schema";
import { eq } from "drizzle-orm";

type Json = Record<string, any>;

function merge<T extends Json>(defaults: T, stored?: Json): T {
  if (!stored) return defaults;
  return { ...defaults, ...stored } as T;
}

/**
 * Return content for `slug`. If missing in DB, seed it with `defaults`.
 * Use from SERVER components/routes only.
 */
export async function getContent<T extends Json>(slug: string, defaults: T): Promise<T> {
  const [row] = await db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.slug, slug))
    .limit(1);

  if (!row) {
    // seed once with current harddcoded text
    await db
      .insert(contentBlocks)
      .values({ slug, data: defaults })
      // safe if multiple requests race:
      .onConflictDoNothing({ target: contentBlocks.slug });
    return defaults;
  }

  // merge DB data on top of defaults (so adding new keys later wont break)
  return merge(defaults, row.data as Json);
}
