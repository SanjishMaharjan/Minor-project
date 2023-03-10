const Report = require("../models/reportModel");
const Question = require("../models/questionModel");
const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//* Handle report on question
///////////////////////////////////////////////////////////////

const reportQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  const question = await Question.findById(questionId);
  if (!question) {
    res.status(404);
    throw new Error(`no question by id:${questionId}`);
  }

  const { reason } = req.body;
  // if (!reason) {
  //   res.status(400);
  //   throw new Error("reason cannot be empty");
  // }

  //* check if it has already been reported or not
  //todo: If it hasn't been reported create new report and also set the isReported flag of question
  if (!question.isReported) {
    const report = await Report.create({
      reportedOn: questionId,
      onPost: "Question",
      reasons: reason,
      reportedUser: question.questioner,
      count: 1,
    });
    question.isReported = true;
    question.save();
    res.status(200).json(report);
  } else {
    //todo: If it has been reported previously then just modify the previous report
    const report = await Report.findOne({ reportedOn: questionId });
    const array = report.reasons.filter((e) => e == reason);
    if (array.length === 0) {
      report.reasons.push(reason);
    }
    report.count += 1;
    await report.save();
    res.status(200).json(report);
  }
});

//*  handle Report on comment
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

module.exports = {
  reportComment,
  reportQuestion,
};
