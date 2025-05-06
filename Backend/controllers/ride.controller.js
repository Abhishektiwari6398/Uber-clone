const { validationResult } = require("express-validator");
const rideService = require("../services/ride.services");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");


module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);

    // Get coordinates for pickup
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log("Pickup coordinates:", pickupCoordinates);

    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lon,
      1500
    );
    ride.otp=''
    const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('userId');
    captainsInRadius.map(captain => {
      sendMessageToSocketId(captain.socketId, {
        event:"new-ride",
        data: rideWithUser
      //   event: "update-location-captain",
      //   data: {
      //     userId: captain._id,
      //     location: {
      //       lat: pickupCoordinates.lat,
      //       lon: pickupCoordinates.lon,
      //     },
      //   },
      // });
      });
    });
    console.log("Captains in the radius:", captainsInRadius);
  } catch (error) {
    console.error("Error creating ride:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.confirmRide=async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {rideId} = req.body;
  try {
    const ride=await rideService.confirmRide({rideId,captain: req.captain});
    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }

}
module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
      const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

      console.log(ride);

      sendMessageToSocketId(ride.userId.socketId, {
          event: 'ride-started',
          data: ride
      })

      return res.status(200).json(ride);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
}
module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
      const ride = await rideService.endRide({ rideId, captain: req.captain });

      sendMessageToSocketId(ride.userId.socketId, {
          event: 'ride-ended',
          data: ride
      })

      return res.status(200).json(ride);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
}