import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("polozky_bazaru", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  city: text("city").notNull(),
  category: integer("categoryID").notNull(),
  price: integer("price"),
  createdByName: text("created_by_name").notNull(),
  createdByEmail: text("created_by_email").notNull(),
  status: integer("statusID").notNull(),
  imageUrl: text("image_url"),
});

// This export helps with TypeScript intellisense later
export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
