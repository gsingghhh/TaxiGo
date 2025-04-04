import { validationResult } from "express-validator";
import { confirmRideService, createRide, rideEndService, startRideService } from "../services/ride.services.js";
import { getFare } from "../services/ride.services.js";
import { getAddressCoordinates, getCaptainsInRadius } from "../services/location.services.js";
import { sendMessageToSocketId } from "../socket.js";
import RIDE from "../models/rideSchema.js";

export const newRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { origin, destination, vehicleType } = req.body;

  try {
    const ride = await createRide({
      user: req.user._id,
      origin,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);
    const originCoordinates = await getAddressCoordinates(origin)

    const captainsInRadius = await getCaptainsInRadius(originCoordinates.ltd, originCoordinates.lng, 50)

    ride.otp = ""

    const rideWithUser = await RIDE.findOne({_id: ride?._id}).populate('user')

    captainsInRadius.map( captain => {
      sendMessageToSocketId(captain.socketId, {
        event: 'new-ride',
        data: rideWithUser
      })
    })
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const generateFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    const fare = await getFare(origin, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const confirmRide = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {rideId} = req.body

  try {
    const ride = await confirmRideService({rideId, captain: req.captain})

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-confirmed',
      data: ride
    })

    return res.status(200).json(ride)
  } catch (error) {
    return res.status(500).json({message: error.messsage})
  }
}

export const startRide = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({message: errors.array()})
  }

  const {rideId, otp} = req.query

  try{
    
    const ride = await startRideService({rideId, otp, captain: req.captain})

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride
    })

    return res.status(200).json(ride)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const endRide = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {rideId} = req.body

  try{
    const ride = await rideEndService({rideId, captain: req.captain})

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-ended',
      data: ride
    })

    return res.status(200).json(ride)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
