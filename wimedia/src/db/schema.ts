import { pgTable, serial, text, timestamp, jsonb, uniqueIndex } from 'drizzle-orm/pg-core';

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  hash: text('hash').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (t) => ({
  emailIdx: uniqueIndex('admins_email_idx').on(t.email),
}));

export const contentBlocks = pgTable('content_blocks', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  data: jsonb('data').$type<unknown>().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (t) => ({
  slugIdx: uniqueIndex('content_slug_idx').on(t.slug),
}));
