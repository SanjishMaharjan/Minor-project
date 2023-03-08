const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const Report = require("../models/reportModel");
const Question = require("../models/questionModel");
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
    await User.findByIdAndUpdate(notification.user, {
      $inc: { notification: 1 },
    });
    const notiLength = (await Notification.find({ user: notification.user }))
      .length;
    deleteNotification(notification.user, notiLength);
  }
  const lol = await User.findByIdAndUpdate(req.user._id, {
    $inc: { contribution: 1 },
  });
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
    questionTitle: question.title,
    QuestionImage: question.image,
    QuestionDate: question.createdAt,
  };

  const unAnswered = await Question.aggregate([
    { $match: { "comments.commentIds": [] } },
    { $sample: { size: 5 } },
    {
      $lookup: {
        from: "users",
        let: { questionerId: "$questioner" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$questionerId"] } } },
          { $project: { name: 1, "image.imagePath": 1 } },
        ],
        as: "questioner",
      },
    },
    { $unwind: "$questioner" },
  ]);

  topContributor = await User.find({})
    .sort({ contribution: -1 })
    .select("name image.imagePath contribution")
    .limit(5);

  const comments = await Comment.find({ questionId }).populate(
    "commenter",
    "name  image.imagePath"
  );

  res.status(200).json({ questionInfo, comments, unAnswered, topContributor });
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
  const deletedComment = await Comment.findOneAndDelete({
    _id: commentId,
    commenter: req.user._id,
    questionId: questionId,
  });
  if (!deletedComment) {
    res.status(400);
    throw new Error("cannot delete the comment");
  }
  const noti = await Notification.findOneAndDelete({
    comment: deletedComment._id,
  });
  await User.findByIdAndUpdate(noti.user, {
    $inc: { notification: -1 },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { contribution: -1 },
  });
  res.status(200).json({ msg: "Comment Deleted Successfully" });
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
  // if (!reason) {
  //   res.status(400);
  //   throw new Error("reason cannot be empty");
  // }

  //* check if it has already been reported or not
  //todo: If it hasn't been reported create new report and also set the isReported flag of comment
  if (!comment.isReported) {
    const report = await Report.create({
      reportedOn: commentId,
      onPost: "Comment",
      reasons: reason,
      count: 1,
      reportedUser: comment.commenter,
    });
    comment.isReported = true;
    await comment.save();
    await User.findByIdAndUpdate(comment.commenter, {
      $inc: { contribution: -1 },
    });
    res.status(200).json(report);
  } else {
    //todo: If it has been reported previously then just modify the previous report
    const report = await Report.findOne({ reportedOn: commentId });
    const array = report.reasons.filter((e) => e == reason);
    if (array.length != 0) {
      report.count += 1;
    } else {
      report.count += 1;
      report.reasons.push(reason);
    }
    await report.save();
    await User.findByIdAndUpdate(report.reportedUser, {
      $inc: { contribution: -1 },
    });
    res.status(200).json(report);
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

//*                    Handle anecdote
/////////////////////////////////////////////////////////////

const verifyComment = asyncHandler(async (req, res) => {
  const { questionId, commentId } = req.params;
  const comment = await Comment.findById(commentId)
    .populate("questionId", "questioner ")
    .exec();
  if (!comment) {
    res.status(404);
    throw new Error(`No comment with id:${commentId}`);
  }

  if (questionId !== comment.questionId._id.toString()) {
    res.status(400);
    throw new Error(
      "question Id in params and questionId in comment.questionId didn't match"
    );
  }
  if (comment.questionId.questioner.toString() != req.user._id.toString()) {
    res.status(400);
    throw new Error("not authenticated");
  }

  const comments = await Comment.find({ questionId, anecdote: true });

  if (!comment.anecdote) {
    for (const c of comments) {
      if (c.anecdote === true) {
        c.anecdote = false;
        await c.save();
        await User.findByIdAndUpdate(comment.commenter, {
          $inc: { contribution: -5 },
        });
      }
    }
  }
  comment.anecdote = !comment.anecdote;
  await comment.save();
  await User.findByIdAndUpdate(comment.commenter, {
    $inc: { contribution: 5 },
  });
  res.status(200);
  res.json(comment);
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
  verifyComment,
};
