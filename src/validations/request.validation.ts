import { z } from "zod";

export const signupPostRequestBodySchema = z.object({
  firstname: z.string("first name is required"),
  lastname: z.string().optional(),
  email: z.email("Invalid email address"),
  password: z
    .string("Password is required")
    .min(3, "Password with minimum length 3"),
});

export const loginPostRequestBodySchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string("Password is required")
    .min(3, "Password with minimum length 3"),
});

export const shortenPostRequestBodySchema = z.object({
  url: z.url("Invalid url"),
  code: z.string().optional(),
});
