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
