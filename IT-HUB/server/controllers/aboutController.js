const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//*get Information about the members
const getMembers = asyncHandler(async (req, res) => {
  const members = await User.find({ membership: { $ne: "Student" } }).select(
    "name email image.imagePath membership"
  );
  res.status(200).json(members);
});

//*export modules
module.exports = {
  getMembers,
};
