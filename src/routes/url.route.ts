import { Router, type Response } from "express";
import { shortenPostRequestBodySchema } from "../validations/request.validation";
import { nanoid } from "nanoid";
import type { AuthRequest } from "../types";
import { ensureAuthenticated } from "../middlewares/auth.middleware";
import {
  createShortenCode,
  deleteUrl,
  findTargetUrlByCode,
  getAllUrls,
} from "../services/url.service";

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

router.get(
  "/codes",
  ensureAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const codes = await getAllUrls(req.user!?.id);
    return res.status(200).json({ codes });
  },
);

router.delete(
  "/:id",
  ensureAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const id = req.params?.id as string;
    try {
      await deleteUrl(id, req.user!?.id);
    } catch (error) {
      console.log("error in code delete", error);
      return res.status(400).json({ error: "Failed to deleted." });
    }
    return res.status(200).json({ deleted: true });
  },
);

router.get("/:shortCode", async (req: AuthRequest, res: Response) => {
  const code = req.params?.shortCode as string;

  const result = await findTargetUrlByCode(code);

  if (!result) {
    return res.status(404).json({
      error: "Invalid URL",
    });
  }

  return res.redirect(result.targetURL);
});

export default router;
