import BLACKLISTTOKEN from "../models/blackListSchema.js";
import CAPTAIN from "../models/captainSchema.js";
import jwt from "jsonwebtoken";
import USER from "../models/userSchema.js";

const verifyToken = async (token, Model) => {
  if (!token) {
    throw new Error('Token not found');
  }

  const isBlackListed = await BLACKLISTTOKEN.findOne({ token });
  if (isBlackListed) {
    throw new Error('Token revoked');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Model.findOne({ _id: decoded._id });
  
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    req.user = await verifyToken(token, USER);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const authCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    req.captain = await verifyToken(token, CAPTAIN);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
