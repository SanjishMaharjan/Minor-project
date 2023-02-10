const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  reportedOn: {
    type: mongoose.Types.ObjectId,
  },
  reportedUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  count: {
    type: Number,
    default: 0,
  },
  reasons: [
    {
      type: String,
      required: true,
    },
  ],
  resolved: {
    type: Boolean,
    default: false,
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
