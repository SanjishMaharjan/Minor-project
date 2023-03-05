const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const Report = require("../models/reportModel");
const Question = require("../models/questionModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const { deleteNotification } = require("./notificationController");
///////////////////////////////////////////////////////

//*               creating a comment
///////////////////////////////////////////////////////
const createComment = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const { answer } = req.body;
  if (!answer) {
    res.status(400).json({ msg: "answer field cannot be empty" });
  }
  const question = await Question.findById(questionId);
  if (!question) {
    res.status(404);
    throw new Error(`no question with id: ${questionId}`);
  }
  const comment = await Comment.create({
    answer,
    commenter: req.user._id,
    questionId,
  });
  if (req.user._id.toString() !== question.questioner.toString()) {
    const notification = await Notification.create({
      user: question.questioner,
      post: questionId,
      comment: comment._id,
      commenter: req.user._id,
    });
    const user = await User.findByIdAndUpdate(notification.user, {
      $inc: { notification: 1 },
    });

    const notiLength = (await Notification.find({ user: notification.user }))
      .length;
    deleteNotification(notification.user, notiLength);
  }
  return res
    .status(200)
    .json({ msg: "succesfully created comment and notification" });
});

//*             get comments on specific question
///////////////////////////////////////////////////////////
const getComments = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const question = await Question.findById(questionId).populate(
    "questioner",
    "name image.imagePath"
  );
  if (!question) {
    res.status(404);
    throw new Error(`no question with id:${questionId}`);
  }
  const questionInfo = {
    questioner: question.questioner.name,
    questionerImage: question.questioner.image.imagePath,
    questionerId: question.questioner._id,
    question: question.question,
    questionId: question._id,
    QuestionImage: question.image,
  };
  const comments = await Comment.find({ questionId }).populate(
    "commenter",
    "name  image.imagePath"
  );

  res.status(200).json({ questionInfo, comments });
});

//*                  get a single comment
////////////////////////////////////////////////////////////
//! Is it necessary???

// const getComment = asyncHandler(async (req, res) => {
//   try {
//     const { commentId } = req.params;
//     const comment = await Comment.findById(commentId)
//       .populate("commenter")
//       .populate("questionId");
//     if (!comment) {
//       return res.status(404).json(`no comment with id: ${commentId}`);
//     } else {
//       return res.status(200).json(comment);
//     }
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// });

//*                 delete a single comment
////////////////////////////////////////////////////////////

const deleteComment = asyncHandler(async (req, res) => {
  const { questionId, commentId } = req.params;
  const { _id } = req.user;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error(`no comment with id: ${commentId}`);
  }
  const question = await Question.findById(questionId);
  if (!question) {
    res.status(404);
    throw new Error(`no question with id: ${questionId}`);
  }
  if (questionId !== comment.questionId.toString()) {
    res.status(400);
    throw new Error(`id: ${questionId} != id: ${comment.questionId}`);
  }

  if (_id.toString() === comment.commenter._id.toString()) {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    await Notification.findOneAndDelete({
      comment: deletedComment._id,
    });
    await User.findByIdAndUpdate(question.questioner, {
      $inc: { notification: -1 },
    });
    res.status(200).json({ msg: "Comment Deleted Successfully" });
  } else {
    res.status(400).json({ msg: "Not authorized to delete the the comment" });
  }
});

//*                 update a single comment
////////////////////////////////////////////////////////////

const updateComment = asyncHandler(async (req, res) => {
  const { questionId, commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json(`no comment with id: ${id}`);
  if (questionId != comment.questionId.toString()) {
    res.status(400);
    throw new Error(
      "questionId in param and questionId in comment didn't match"
    );
  }
  const { answer } = req.body;
  if (!answer) {
    res.status(400).json({ msg: "answer field cannot be empty" });
  }
  if (req.user._id.toString() === comment.commenter.toString()) {
    const Updatedcomment = await Comment.findByIdAndUpdate(
      commentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json(Updatedcomment);
  } else {
    return res.status(400).json({ msg: "not authorized to delete comment" });
  }
});

//*             get all comment of a specific user
////////////////////////////////////////////////////////////

// const usersComment = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   try {
//     const comments = await Comment.find({ commenter: _id });
//     if (!comments) {
//       return res.status(404).json({ msg: "comments not found" });
//     } else {
//       return res.status(200).json(comments);
//     }
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// });

//*         handle Report!!
/////////////////////////////////////////////////////////
const reportComment = asyncHandler(async (req, res) => {
  const { questionId, commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error(`no comment by id:${commentId}`);
  }

  if (questionId !== comment.questionId.toString()) {
    res.status(400);
    throw new Error(
      "question Id in param and questionId in comment.questionId didn't match"
    );
  }

  const { reason } = req.body;
  if (!reason) {
    res.status(400);
    throw new Error("reason cannot be empty");
  }

  //* check if it has already been reported or not
  //todo: If it hasn't been reported create new report and also set the isReported flag of comment
  if (!comment.isReported) {
    await Report.create(
      { reportedOn: commentId, reasons: reason, count: 1 },
      asyncHandler(async (err, report) => {
        comment.isReported = true;
        await comment.save();
        res.status(200).json(report);
      })
    );
  } else {
    //todo: If it has been reported previously then just modify the previous report
    Report.findOne(
      { reportedOn: commentId },
      asyncHandler(async (err, report) => {
        const array = report.reasons.filter((e) => e == reason);
        if (array.length != 0) {
          report.count += 1;
        } else {
          report.count += 1;
          report.reasons.push(reason);
        }
        await report.save();
        res.status(200).json(report);
      })
    );
  }
});

//*                    Handle Likes!!
///////////////////////////////////////////////////////////////

const upvoteComment = asyncHandler(async (req, res) => {
  const { questionId, commentId } = req.params;
  let comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error(`No comment with id:${commentId}`);
  }
  if (questionId !== comment.questionId.toString()) {
    res.status(400);
    throw new Error(
      "question Id in params and questionId in comment.questionId didn't match"
    );
  }
  const alreadyUpvoted =
    comment.upvote.upvoters.filter(
      (e) => e.toString() === req.user._id.toString()
    ).length > 0;
  const operation = alreadyUpvoted ? "$pull" : "$push";
  comment = await Comment.findOneAndUpdate(
    { _id: commentId },
    {
      $inc: { "upvote.count": alreadyUpvoted ? -1 : 1 },
      [operation]: { "upvote.upvoters": req.user._id },
    },
    { new: true }
  );

  res.status(200);
  res.json(comment.upvote.count);
});

//* get number of likes on comment
///////////////////////////////////////////////////////////
const getUpvotes = asyncHandler(async (req, res) => {
  const { commentId, questionId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error(`no comment with id:${commentId}`);
  }
  if (questionId !== comment.questionId.toString()) {
    res.status(400);
    throw new Error(
      "question Id in params and questionId in comment.questionId didn't match"
    );
  }
  res.status(200).json({ upvote: comment.upvote.count });
});

//* export modules

module.exports = {
  createComment,
  getComments,
  deleteComment,
  updateComment,
  upvoteComment,
  getUpvotes,
  reportComment,
};
