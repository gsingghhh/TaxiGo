import BLACKLISTTOKEN from "../models/blackListSchema.js";
import USER from "../models/userSchema.js";
import { createNewUser } from "../services/user.services.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullName, email, password } = req.body;

  const isUserAlreadyExist = await USER.findOne({email})

  if(isUserAlreadyExist){
    return res.status(401).json({msg: 'Email is already registered'})
  }

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

export const loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty) {
    return res.status(400).json({ error: error });
  }

  const { email, password } = req.body;

  const user = await USER.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = await user.generateAuthToken();

  res.cookie("token", token);

  return res.status(200).json({ token, user });
};

export const getUserProfile = async (req, res) => {
  return res.status(200).json(req.user);
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BLACKLISTTOKEN.create({ token });

  return res.status(200).json({ message: "Logged Out" });
};
