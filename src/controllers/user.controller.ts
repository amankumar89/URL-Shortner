import type { Request, Response } from "express";
import {
  loginPostRequestBodySchema,
  signupPostRequestBodySchema,
} from "../validations/request.validation";
import { createUser, getUserByEmail } from "../services/user.service";
import { verifyPassword } from "../utils/hash";
import { createToken } from "../utils/token";

export const signup = async (req: Request, res: Response) => {
  // validation on request body
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body,
  );
  if (validationResult.error) {
    return res.status(400).send({ error: validationResult.error.format() });
  }
  // extract firstname, lastname, email, password
  const { firstname, lastname, email, password } = validationResult.data;

  // check for existing user
  const existingUsers = await getUserByEmail(email);

  // return error if user already exists
  if (existingUsers)
    return res
      .status(401)
      .json({ error: `User already exists with email ${email}` });

  // if user not exists create user in db
  const user = await createUser(firstname, lastname, email, password);

  // return userId of created user
  return res.status(201).json({ userId: user!.id });
};

export const login = async (req: Request, res: Response) => {
  // validations for email, password
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  // if error return error to client
  if (validationResult.error) {
    return res.status(400).send({ error: validationResult.error.format() });
  }

  // extract email, password from validations data
  const { email, password } = validationResult.data;

  // check if user exists or not in db
  const user = await getUserByEmail(email);

  // if user doesn't exists return error to client
  if (!user) {
    return res
      .status(404)
      .send({ error: `User doesn't exists with email ${email}` });
  }

  // if exists check for password valid or not
  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = await createToken({ id: user.id });
  return res.status(201).json({ token });
};
