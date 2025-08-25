import 'dotenv/config';
import path from 'path';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not set');
  }
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: path.join(process.cwd(), 'drizzle') });
  console.log('✅ Migrations applied');
}

main().catch((e) => {
  console.error('❌ Migration failed:', e);
  process.exit(1);
});
