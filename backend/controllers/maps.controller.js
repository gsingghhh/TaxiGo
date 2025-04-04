import {
  getAddressCoordinates,
  getAutoSuggestion,
  getTimeAndDistance,
} from "../services/location.services.js";
import { validationResult } from "express-validator";

export const getCoordinates = async (req, res) => {
  const { address } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const coordinates = await getAddressCoordinates(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    return res.status(404).json({ message: "Coordinates not found" });
  }
};

export const getDistanceTime = async (req, res) => {
  const { origin, destination } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const response = await getTimeAndDistance(origin, destination);
    return res.status(200).json(response);
    } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
}

export const getAutoCompleteSuggestion = async (req, res) => {
  const { input } = req.query;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: "Field can't be empty" });
  }

  try {
    const response = await getAutoSuggestion(input);
    return res.status(200).json(response)
    
  } catch (error) {
    return res.status(400).json({msg: "couldn't fetch"})
  }
};
