import bcrypt from "bcrypt";

const SALT_ROUNDS = 16;

export async  function hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
    password: string,
    hashedPassword: string
) {
    return await bcrypt.compare(password, hashedPassword);
}
