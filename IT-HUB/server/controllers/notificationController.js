const Notification = require("../models/notificationModel");
const asyncHandler = require("express-async-handler");

//* get notification
////////////////////////////////////////////
const getNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.find({ user: req.user._id })
    .populate("commenter", "name -_id")
    .populate("comment", "answer -_id")
    .populate("post", "question ")
    .select("-user");

  console.log(notification);
  res.status(200).json(notification);
});

//* delete notification after vewing it
//////////////////////////////////////////////
const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const notification = await Notification.findByIdAndDelete(notificationId);
  if (!notification) {
    res.status(404);
    throw new Error(`no notification with id: ${notificationId}`);
  }
  res.status(200).json({ msg: "deleted notification" });
});

module.exports = {
  getNotification,
  deleteNotification,
};
