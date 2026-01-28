import type { Response } from "express";
import type { AuthRequest } from "../types";
import { shortenPostRequestBodySchema } from "../validations/request.validation";
import { nanoid } from "nanoid";
import {
  createShortenCode,
  deleteUrl,
  findTargetUrlByCode,
  getAllUrls,
} from "../services/url.service";

export const shortenUrl = async (req: AuthRequest, res: Response) => {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body,
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { code, url } = validationResult.data;

  const shortCode = code ?? nanoid(6);

  const result = await createShortenCode(shortCode, url, req?.user!?.id);

  return res.status(201).json({
    id: result?.id,
    shortCode: result?.shortCode,
    targetURL: result?.targetURL,
  });
};

export const getAllCodes = async (req: AuthRequest, res: Response) => {
  const codes = await getAllUrls(req.user!?.id);
  return res.status(200).json({ codes });
};

export const deleteUrlById = async (req: AuthRequest, res: Response) => {
  const id = req.params?.id as string;
  try {
    await deleteUrl(id, req.user!?.id);
  } catch (error) {
    console.log("error in code delete", error);
    return res.status(400).json({ error: "Failed to deleted." });
  }
  return res.status(200).json({ deleted: true });
};

export const redirectToShortcode = async (req: AuthRequest, res: Response) => {
  const code = req.params?.shortCode as string;

  const result = await findTargetUrlByCode(code);

  if (!result) {
    return res.status(404).json({
      error: "Invalid URL",
    });
  }

  return res.redirect(result.targetURL);
};
