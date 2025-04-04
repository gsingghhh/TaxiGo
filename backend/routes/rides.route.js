import { Router } from "express";
import { body, query } from "express-validator";
import { confirmRide, endRide, generateFare, newRide, startRide } from "../controllers/ride.controller.js";
import { authCaptain, authUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/create',
    authUser,
    body('origin').isString().isLength({min: 3}).withMessage('Origin is required'),
    body('destination').isString().isLength({min:3}).withMessage('Destination is required'),
    body('vehicleType').isString().isIn(['car', 'bike', 'auto']).withMessage('Vehicle type invalid'),
    newRide
)

router.get('/get-fare',
    authUser, 
    query('origin').isString().withMessage('Pickup is required'),
    query('destination').isString().withMessage('Destination is required'),
    generateFare
)

router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    confirmRide
)

router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid RideId'),
    query('otp').isString().isLength({min:6, max:6}).withMessage('Invalid otp'),
    startRide
)

router.post('/end-ride', 
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride Id'),
    endRide
)

export default router