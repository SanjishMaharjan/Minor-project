const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }

  //* Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  //* Get user id from token
  const user = await User.findById(verified.id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  req.user = user;
  next();
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }

  //* Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  //* Get user id from token
  const user = await User.findById(verified.id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (!user.isAdmin) {
    res.status(400);
    throw new Error("not authorized as admin");
  }

  req.admin = user;
  next();
});

module.exports = { protect, isAdmin };
