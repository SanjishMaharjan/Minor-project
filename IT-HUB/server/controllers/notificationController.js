const Notification = require("../models/notificationModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//* get notification
////////////////////////////////////////////
const getNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("no user available");
  }
  user.notification = 0;
  user.save();
  const notification = await Notification.find({ user: req.user._id })
    .populate("commenter", "name _id")
    .populate("post", "title ")
    .select("-user -comment");
  await Notification.updateMany(
    { user: req.user._id },
    { $set: { viewed: true } }
  );
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
    await Notification.findByIdAndDelete(notificationId);
    return true;
  }
  return false;
});

//* get notification count
////////////////////////////////////////////////
const getNotificationCount = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  if (!user) {
    res.status(404);
    throw new Error("no user available");
  }
  const count = user.notification;
  res.status(200).json({ count });
});
module.exports = {
  getNotification,
  deleteNotification,
  getNotificationCount,
};
