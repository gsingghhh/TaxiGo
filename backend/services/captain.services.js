import CAPTAIN from "../models/captainSchema.js";

const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  vehicleType,
  capacity,
  plate,
}) => {
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !vehicleType ||
    !capacity ||
    !plate
  ) {
    throw new Error("Please fill in all fields");
  }
  const captain = CAPTAIN.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      color,
      vehicleType,
      capacity,
      plate,
    },
  });

  return captain;
};

export default createCaptain;
