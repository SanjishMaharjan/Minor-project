const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    post: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Question",
    },
    viewed: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Comment",
    },
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
