const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model.js");

module.exports.registerUser = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    
    const isUserAllredyexist=await userModel.findOne({email});

    if( isUserAllredyexist){
      return res.status(400).json({message:'User alredy exist'});
    }

    // Validate fullname structure
    if (!fullname?.firstname || !fullname?.lastname) {
      return res.status(400).json({
        message: "Full name must include both firstname and lastname.",
      });
    }
    // Hash the password
    const hashedPassword = await userModel.hashPassword(password);

    // Create user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate auth token
    const token = user.generateAuthToken();

    // Respond with user details and token
    res.status(201).json({ token, user });
  } catch (err) {
    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }

    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListTokenModel.create({ token });
  res.status(200).json({ message: "Logged out" });
};
