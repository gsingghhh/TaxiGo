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
