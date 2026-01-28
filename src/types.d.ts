import type { Request } from "express";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}
