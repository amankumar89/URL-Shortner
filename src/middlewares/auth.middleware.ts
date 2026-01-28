import type {NextFunction, Request, Response} from "express";
import {verifyToken} from "../utils/token.ts";

export async function authenticationMiddleware(req: Request, res:Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return next();
        // return res.status(401).json({ error: "Unauthorized" });
    }

    if(!authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ error: "Authorization header must start with Bearer" });
    }

    const [_, token] = authHeader.split(" ") ;

    // @ts-ignore
    req.user = await verifyToken(token!);
    return next();
}