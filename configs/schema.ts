import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const JsonForms = pgTable('JsonForms', {
  id: serial('id').primaryKey(),
  jsonForm: text('jsonform').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt').notNull(),
});
 