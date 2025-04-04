import RIDE from "../models/rideSchema.js";
import { getTimeAndDistance } from "./location.services.js";
import crypto from "crypto";

export const getFare = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getTimeAndDistance(origin, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    bike: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    bike: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    bike: 1.5,
  };

  const fare = {
    auto: (
      baseFare.auto +
      distanceTime.distanceInKm * perKmRate.auto +
      distanceTime.etaMinutes * perMinuteRate.auto
    ).toFixed(1),
    car: (
      baseFare.car +
      distanceTime.distanceInKm * perKmRate.car +
      distanceTime.etaMinutes * perMinuteRate.car
    ).toFixed(1),
    bike: (
      baseFare.bike +
      distanceTime.distanceInKm * perKmRate.bike +
      distanceTime.etaMinutes * perMinuteRate.bike
    ).toFixed(1),
  };

  return fare;
};

const generateOtp = (num) => {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
};

export const createRide = async ({
  user,
  origin,
  destination,
  vehicleType,
}) => {

  if (!user || !origin || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(origin, destination);

  const ride = RIDE.create({
    user,
    origin,
    destination,
    otp: generateOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

export const confirmRideService = async ({ rideId, captain }) => {
  if (!rideId || !captain) {
    throw new Error("Ride id is required");
  }

  await RIDE.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await RIDE.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

export const startRideService = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await RIDE.findOne({
    _id: rideId,
  })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await RIDE.findByIdAndUpdate(rideId,{
      status: "ongoing"
    }
  );

  return ride;
};

export const rideEndService = async ({rideId, captain}) => {
  if(!rideId) {
    throw new Error('Ride id is required')
  }

  const ride = await RIDE.findOne({
    _id: rideId,
    captain: captain._id
  }).populate('user').populate('captain').select('+otp')

  if(!ride) {
    throw new Error('Ride not found')
  }

  if(ride.status !== 'ongoing') {
    throw new Error('Ride not ongoing')
  }

  await RIDE.findOneAndUpdate({
    _id: rideId
  }, {
    status: 'completed'
  })

  return ride
}