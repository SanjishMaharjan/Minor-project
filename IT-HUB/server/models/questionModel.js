const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "query cannot be empty"],
    },
    tag: [String],
    upvote: {
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
      upvoters: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    isReported: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    questioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "there should be user who posts the question"],
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
