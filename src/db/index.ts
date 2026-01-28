// Make sure to install the 'pg' package
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "../config/env";

if (!env.DATABASE_URL)
  throw new Error("DATABASE_URL NOT CONFIGURED IN ENV FILE");

const db = drizzle(process.env.DATABASE_URL!);

export default db;
