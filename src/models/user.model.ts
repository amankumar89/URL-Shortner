import {pgTable, uuid, varchar, timestamp, text} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstname: varchar("first_name", { length: 100 }).notNull(),
  lastname: varchar("last_name", { length: 100 }),

  email: varchar({ length: 255 }).notNull().unique(),

  password: text().notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
});
