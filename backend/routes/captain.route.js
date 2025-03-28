import { Router } from "express";
import { body } from "express-validator";
import {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
} from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Specify color of the vehicle"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Registration plate info is required"),
    body("vehicle.vehicleType")
      .isIn(["bike", "auto", "car"])
      .withMessage("Invalid type"),
  ],
  registerCaptain
);

router.post(
  "/login",
  [body("email").isEmail().withMessage("Invalid Email")],
  loginCaptain
);

router.get("/profile", authCaptain, getCaptainProfile);

router.get("/logout", authCaptain, logoutCaptain);

export default router;
