const mongoose = require("mongoose");
const Question = require("./questionModel");

const commentSchema = mongoose.Schema(
  {
    answer: {
      type: String,
      required: [true, "answer cannot be empty"],
    },
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
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "It is probably done by some user!"],
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "Comment is done on the question!"],
    },
  },
  {
    timestamps: true,
  }
);

//* deleting comment should remove it from question's comments array
commentSchema.post("findOneAndDelete", async function (comment) {
  await Question.findByIdAndUpdate(
    comment.questionId,
    {
      $pull: { "comments.commentIds": mongoose.Types.ObjectId(comment._id) },
      $inc: { "comments.count": -1 },
    },
    { new: true }
  );
});

//* also push the new created comment's id to question's comment array
commentSchema.pre("save", function (next) {
  if (this.isModified("upvote") || this.isModified("isReported")) return next();
  const { _id, questionId } = this;
  Question.findOne({ _id: questionId }, function (err, question) {
    if (err) {
      return next(new Error("server error occured"));
    }
    question.comments.commentIds.push(_id);
    question.comments.count += 1;
    question.save();
    next();
  });
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
