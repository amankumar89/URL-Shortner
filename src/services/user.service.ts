import db from "../db";
import {userTable} from "../models";
import {eq} from "drizzle-orm";
import {hashPassword} from "../utils/hash.ts";

// GET USER BY EMAIL
export const getUserByEmail = async (email: string) => {
    const [existingUsers] = await db.select({
        id: userTable.id,
        firstname: userTable.firstname,
        lastname: userTable.lastname,
        email: userTable.email,
        password: userTable.password,
    }).from(userTable).where(eq(userTable.email, email));

    return existingUsers;
}

// CREATE USER
export const createUser = async (firstname: string, lastname: string | undefined, email: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    const [user] = await db.insert(userTable).values({
        firstname,
        lastname,
        email,
        password: hashedPassword,
    }).returning({ id: userTable.id  });

    return user;
}

