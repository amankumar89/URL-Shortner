import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/auth.middleware";
import * as urlControllers from "../controllers/url.controller";

const router = Router();

router.post("/shorten", ensureAuthenticated, urlControllers.shortenUrl);

router.get("/codes", ensureAuthenticated, urlControllers.getAllCodes);

router.delete("/:id", ensureAuthenticated, urlControllers.deleteUrlById);

router.get("/:shortCode", urlControllers.redirectToShortcode);

export default router;
