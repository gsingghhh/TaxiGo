import BLACKLISTTOKEN from "../models/blackListSchema.js";
import CAPTAIN from "../models/captainSchema.js";
import jwt from "jsonwebtoken";
import USER from "../models/userSchema.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ mesage: "Token not found" });
  }

  const isBlackListed = await BLACKLISTTOKEN.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await USER.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({message: error});
  }
};

export const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ msg: "Unauthorized" });
  }

  const isBlackListed = await BLACKLISTTOKEN.findOne({ token: token });

  if (isBlackListed) {
    return res.status(400).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await CAPTAIN.findById(decoded._id);

    req.captain = captain;

    return next();
  } catch (err) {
    return res.status(400).json({ error: "Unauthorized" });
  }
};
