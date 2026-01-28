import { Router, type Response } from "express";
import { shortenPostRequestBodySchema } from "../validations/request.validation";
import { nanoid } from "nanoid";
import type { AuthRequest } from "../types";
import { ensureAuthenticated } from "../middlewares/auth.middleware";
import { createShortenCode } from "../services/url.service";

const router = Router();

router.post(
  "/shorten",
  ensureAuthenticated,
  async (req: AuthRequest, res: Response) => {
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
  },
);

export default router;
