import express, { type Request, type Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "Server is health and running fine.",
  });
});

export default app;
