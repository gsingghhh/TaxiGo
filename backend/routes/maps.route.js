import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { getAutoCompleteSuggestion, getCoordinates, getDistanceTime } from "../controllers/maps.controller.js";
import { query, body } from "express-validator";

const router = Router();

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);

router.get(
  "/get-distance-time",
  body("origin").isString().isLength({ min: 3 }),
  body("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceTime
);

router.get(
  '/get-suggestions',
  query('input').isString().isLength({min: 3}),
  authUser,
  getAutoCompleteSuggestion
)

export default router;
