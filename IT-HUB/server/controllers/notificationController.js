const Notification = require("../models/notificationModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//* get notification
////////////////////////////////////////////
const getNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.notification = 0;
  user.save();
  const notification = await Notification.find({ user: req.user._id })
    .populate("commenter", "name -_id")
    .populate("comment", "answer -_id")
    .populate("post", "question ")
    .select("-user");
  res.status(200).json(notification);
});

//* delete notification
//////////////////////////////////////////////
const deleteNotification = asyncHandler(async (userId, notiLength) => {
  maxNotificationNumber = 20;
  if (notiLength > maxNotificationNumber) {
    const notificationId = (
      await Notification.find({ user: userId }).sort({ date: 1 })
    )[0]._id;
    const lol = await Notification.findByIdAndDelete(notificationId);
    return true;
  }
  return false;
});

//* get notification count
////////////////////////////////////////////////
const getNotificationCount = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  console.log(user.name);
  const count = user.notification;
  console.log(count);
  res.status(200).json({ count });
});
module.exports = {
  getNotification,
  deleteNotification,
  getNotificationCount,
};
