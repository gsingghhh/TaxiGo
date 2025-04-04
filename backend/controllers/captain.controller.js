import BLACKLISTTOKEN from "../models/blackListSchema.js";
import CAPTAIN from "../models/captainSchema.js";
import createCaptain from "../services/captain.services.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ msg });
  }

  const { fullName, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await CAPTAIN.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(401).json({ msg: "Email already registered" });
  }

  const hashedPassword = await CAPTAIN.hashPassword(password);

  const captain = await createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    vehicleType: vehicle.vehicleType,
    capacity: vehicle.capacity,
    plate: vehicle.plate,
  });

  const token = captain.generateAuthToken();

  return res.status(201).json({ token, captain });
};

export const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await CAPTAIN.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ msg: "Email or Password Incorrect" });
  }

  const isMatch = captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ msg: "Email or Password Incorrect" });
  }

  const token = await captain.generateAuthToken();

  res.cookie("token", token);

  return res.status(200).json({ token, captain });
};

export const getCaptainProfile = async (req, res) => {
  return res.status(200).json({ captain: req.captain });
};

export const logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BLACKLISTTOKEN.create({ token });

  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out successfully" });
};
