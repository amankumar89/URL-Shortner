import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { userTable } from "./user.model";

export const urlsTable = pgTable("urls", {
  id: uuid("id").primaryKey().defaultRandom(),

  shortCode: varchar("code", { length: 100 }).unique().notNull(),
  targetURL: text("target_url").notNull(),

  userId: uuid("user_id")
    .references(() => userTable.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
