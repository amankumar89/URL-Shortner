import express, { type Request, type Response } from "express";
import { authenticationMiddleware } from "./middlewares/auth.middleware";

import userRoutes from "./routes/user.route";
import urlRoutes from "./routes/url.route";

const app = express();

app.use(express.json());
app.use(authenticationMiddleware);

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "Server is health and running fine.",
  });
});

app.use(urlRoutes);
app.use("/user", userRoutes);

export default app;
