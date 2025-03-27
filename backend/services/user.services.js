import USER from "../models/userSchema.js";
import mongoose from "mongoose";

export const createNewUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = USER.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });

  return user;
};
