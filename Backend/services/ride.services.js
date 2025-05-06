const captainModel = require("../models/captain.model");
const rideModel = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");
const mapService = require("./maps.service");
const crypto = require("crypto");

const baseFare = {
  auto: 30,
  moto: 20,
  car: 50,
};

const perKmRate = {
  auto: 10,
  moto: 15,
  car: 20,
};

const perMinuteRate = {
  auto: 2,
  moto: 1.5,
  car: 3,
};

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Invalid Pickup or Destination Location");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  const distance = distanceTime.distance.value / 1000; // distance in km
  const duration = distanceTime.duration.value / 60; // duration in minutes

  const fare = {
    auto: Math.round(
      baseFare.auto + distance * perKmRate.auto + duration * perMinuteRate.auto
    ),
    moto: Math.round(
      baseFare.moto + distance * perKmRate.moto + duration * perMinuteRate.moto
    ),
    car: Math.round(
      baseFare.car + distance * perKmRate.car + duration * perMinuteRate.car
    ),
  };
  return fare;
}
module.exports.getFare = getFare;

function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(pickup, destination);
  const ride = rideModel.create({
    userId: user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });
  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }
  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "Accepted",
      captain: captain._id,
    },
    { new: true }
  );

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("userId")
    .populate({
      path: "captain",
      model: "Captain",
    })
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride ID and OTP are required");
  }
  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("userId")
    .populate({
      path: "captain",
      model: "Captain",
    })
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "Accepted") {
    throw new Error("Ride is not accepted");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "Ongoing",
    }
  );
  sendMessageToSocketId(ride.userId.socketId, {
    event: "ride-started",
    data: ride,
  });

  return ride;
};
module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }
  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("userId")
    .populate({
      path: "captain",
      model: "Captain",
    })
    .select("+otp");
    if(!ride) {
      throw new Error("Ride not found");
    }
  if (ride.status !== "Ongoing") {
    throw new Error("Ride is not ongoing");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "Completed",
    }
  );
  return ride;
};
