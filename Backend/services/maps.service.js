const axios = require("axios");
require("dotenv").config();
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    address
  )}&lang=en&limit=5&format=json&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },  
    });
    const data = response.data;

    if (data.results && data.results.length > 0) {
      const location = data.results[0];
      return {
        lat: location.lat,
        lon: location.lon,
      };
    } else {
      throw new Error("Coordinates not found");
    }
  } catch (error) {
    throw new Error("Coordinates not found");
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  const apiKey = process.env.GEOAPIFY_API_KEY;

  // Convert origin and destination to coordinates if they are not already
  const originCoordinates = await this.getAddressCoordinate(origin);
  const destinationCoordinates = await this.getAddressCoordinate(destination);

  const url = `https://api.geoapify.com/v1/routing?waypoints=${originCoordinates.lat},${originCoordinates.lon}|${destinationCoordinates.lat},${destinationCoordinates.lon}&mode=drive&apiKey=${apiKey}`;

  try {
    // console.log(`Sending request to URL: ${url}`);
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(`Response received:`, response.data);
    const data = response.data;

    if (data.features && data.features.length > 0) {
      const properties = data.features[0].properties;
      // console.log(`Extracted distance and duration:`, properties);
      return {
        distance: {
          text: `${(properties.distance / 1000).toFixed(2)} km`,
          value: properties.distance,
        },
        duration: {
          text: `${Math.ceil(properties.time / 60)} mins`,
          value: properties.time,
        },
      };
    } else {
      // console.error("No features found in the response");
      throw new Error("Distance and time not found");
    }
  } catch (error) {
    throw new Error("Internal server error");
  }
};
module.exports.getAutoCompleteSuggestions = async (query) => {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    throw new Error("Geoapify API key is missing");
  }

  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    query
  )}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    if (data.features && data.features.length > 0) {
      return data.features.map((feature) => ({
        text: feature.properties.formatted,
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0],
        city: feature.properties.city,
        country: feature.properties.country,
        name: feature.properties.name,
      }));
    } else {
      throw new Error("No suggestions found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching autocomplete suggestions");
  }
};

module.exports.getCaptainsInTheRadius = async (lat, lon, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lat, lon], radius / 6371],
      },
    },
  });
  // console.log("captains in the radius", captains);
  return captains;
};
