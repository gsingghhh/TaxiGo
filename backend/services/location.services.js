import axios from "axios";
import CAPTAIN from "../models/captainSchema.js";

export const getAddressCoordinates = async (address) => {
  if (!address) {
    throw new Error("Address is required!!");
  }
  const apiKey = process.env.MAPS_API;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    address
  )}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const lng = response.data.features[0].geometry.coordinates[0];
      const ltd = response.data.features[0].geometry.coordinates[1];
      return {
        lng,
        ltd,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (err) {
    console.error("Geocoding Error:", err.message);
    throw err;
  }
};

export const getTimeAndDistance = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Both origin and destination are required!");
  }
  const apiKey = process.env.MAPS_API;
  const originCoordinates = await getAddressCoordinates(origin);
  const destinationCoordinates = await getAddressCoordinates(destination);
  const url = `https://api.geoapify.com/v1/routing?waypoints=${originCoordinates.ltd}%2C${originCoordinates.lng}%7C${destinationCoordinates.ltd}%2C${destinationCoordinates.lng}&mode=drive&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const distanceInMeters = response.data.features[0].properties.distance;
      const distanceInKm = (distanceInMeters / 1000).toFixed(2);
      const etaSeconds = response.data.features[0].properties.time;
      const etaMinutes = (etaSeconds / 60).toFixed(2);
      return {
        distanceInKm,
        etaMinutes,
      };
    }
  } catch (error) {
    console.log("Error fetching data", error.response?.data || error.message);
    throw new Error(error);
  }
};

export const getAutoSuggestion = async (input) => {
  if (!input) {
    throw new Error("Input is required!!");
  }
  const apiKey = process.env.MAPS_API;
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    input
  )}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const formattedAddresses = response.data.features.map(
        (feature) => feature.properties.formatted
      );

      return formattedAddresses;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching autosuggestion");
  }
};

export const getCaptainsInRadius = async (ltd, lng, radius) => {

  //radius in km

  const captains = await CAPTAIN.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });
  return captains;
};
