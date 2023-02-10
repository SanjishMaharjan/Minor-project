const mongoose = require("mongoose");

const pollSchema = mongoose.Schema({
  topic: {
    type: String,
    required: [true, "topic should not be empty"],
  },
  description: {
    type: String,
  },
  phase: {
    type: String,
    enum: ["Initial", "Final"],
    default: "Initial",
  },
  restriction: [
    {
      type: String,
    },
  ],
  candidates: [mongoose.Types.ObjectId],
  winner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  startsAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const Poll = mongoose.model("Poll", pollSchema);

const candidateSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  pollId: {
    type: mongoose.Types.ObjectId,
    ref: "Poll",
  },
  vote: {
    count: {
      type: Number,
      default: 0,
    },
    voters: [{ type: mongoose.Types.ObjectId }],
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = { Poll, Candidate };
