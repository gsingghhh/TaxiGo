import USER from "../models/userSchema.js";
import { createNewUser } from "../services/user.services.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullName, email, password } = req.body;

  const hashedPassword = await USER.hashPassword(password);

  const user = await createNewUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
  });

  const token = await user.generateAuthToken();

  return res.status(201).json({ token, user });
};
