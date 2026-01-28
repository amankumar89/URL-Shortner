import { userTokenSchema } from "../validations/token.validation.ts";
import { env } from "../config/env.ts";
import jwt from 'jsonwebtoken';

export const createToken = async (payload: { id: string }) => {
    const validationResult = await userTokenSchema.safeParseAsync(payload);
    if (validationResult.error) {
        throw new Error(validationResult.error.message);
    }

    const validatedPayload = validationResult.data;

    return jwt.sign(validatedPayload, env.JWT_SECRET!);
}

export const verifyToken = async (token: string) => {
    try {
        return jwt.verify(token, env.JWT_SECRET!);
    } catch (err) {
        return null;
    }
}