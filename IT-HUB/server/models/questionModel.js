const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title of query cannot be empty"],
    },
    question: {
      type: String,
      require: [true, "query cannot be empty"],
    },
    tag: [String],
    isReported: {
      type: Boolean,
      default: false,
    },
    comments: {
      count: { type: Number, default: 0, min: 0 },
      commentIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
    },
    questioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "there should be user who posts the question"],
    },
    image: {},
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
