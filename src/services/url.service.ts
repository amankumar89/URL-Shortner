import { eq } from "drizzle-orm";
import db from "../db";
import { urlsTable } from "../models";

export const createShortenCode = async (
  shortCode: string,
  url: string,
  userId: string,
) => {
  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode,
      targetURL: url,
      userId,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
    });

  return result;
};

export const findTargetUrlByCode = async (shortCode: string) => {
  const [result] = await db
    .select({
      targetURL: urlsTable.targetURL,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, shortCode));

  return result;
};
