const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Question = require("../models/questionModel");
const Comment = require("../models/commentModel");
const Report = require("../models/reportModel");
const { Poll, Candidate } = require("../models/pollModel");
const { sendEmail } = require("../utils/sendEmail");

//* Admin can view all the users of the site!
///////////////////////////////////////////////////////////
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

//* Admin can delete the account of user
//? but why?
//todo: deleting user also should delete the post and reports and upvotes done by the user lol
//////////////////////////////////////////////////////////
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    res.status(404);
    throw new Error(`no user with id: ${userId}`);
  }
  res.status(200).json(deletedUser);
});

//* Admin can view the reported posts
///////////////////////////////////////////////////////////////
const getReportedPosts = asyncHandler(async (req, res) => {
  const reportedPosts = await Report.find()
    .populate("reportedOn")
    .sort({ count: -1 });
  res.status(200).json(reportedPosts);
});

//* Admin can delete the reported post
//////////////////////////////////////////////////////////////
const deleteReportedPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comment = await Comment.findById(postId).populate(
    "commenter",
    "name email"
  );

  if (comment && comment.isReported) {
    const deletedComment = await Comment.findByIdAndDelete(comment._id);
    const message = `
          <h2>Hello ${comment.commenter.name}</h2>
          <p>Reports on your comment were reviewed by the admin and found to be vali.</p>
          <p>So your comment has been removed by the admin.</p>
          <p>Please don't post unnecessary comments or else your account will be deleted then you can't take part in events oragnized by the club and you as well receive more punishment from the college aswell.</p>
          <p>Be more carefull</p>
          <p>Reported Comment: </p>
          <p>${deletedComment.answer}</p>
          <p>Regards...</p>
          <p>IT-Hub</p>
        `;
    const subject = "Comment Removed By Admin";
    const send_to = comment.commenter.email;
    const sent_from = process.env.EMAIL_USER;
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json(deletedComment);
  }

  const question = await Question.findById(postId).populate(
    "questioner",
    "name email"
  );
  if (question && question.isReported) {
    const deletedQuestion = await Question.findByIdAndDelete(postId);
    await Comment.deleteMany({ _id: deletedQuestion.comments });
    const message = `
            <h2>Hello ${question.questioner.name}</h2>
            <p>Reports on your question were reviewed by the admin and found to be vali.</p>
            <p>So your question has been removed by the admin.</p>
            <p>Please don't post unnecessary comments or else your account will be deleted then you can't take part in events oragnized by the club and you as well receive more punishment from the college aswell.</p>
            <p>Be more carefull</p>
            <p>Reported Comment: </p>
            <p>${deletedQuestion.answer}</p>
            <p>Regards...</p>
            <p>IT-Hub</p>
      `;
    const subject = "Question Removed By Admin";
    const send_to = question.questioner.email;
    const sent_from = process.env.EMAIL_USER;

    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json(deletedQuestion);
  }
  res.status(404).json({ msg: `no post with id: ${postId} has been reported` });
});
//* Admin creates the poll
/////////////////////////////////////////////////////////
const createPoll = asyncHandler(async (req, res) => {
  const { restriction, description, topic, expireTime } = req.body;
  let startTime = req.body.startTime;
  if (startTime === undefined || startTime < 0) {
    startTime = 0;
  }
  if (!topic || !expireTime || !description || expireTime <= 0.5) {
    res.status(400);
    throw new Error(
      "topic, description and expire time should be mentioned and expireTime>0.5"
    );
  }

  const createdAt = new Date(new Date().getTime() + startTime * 60 * 60 * 1000);
  const expiresAt = new Date(createdAt.getTime() + expireTime * 60 * 60 * 1000);
  const poll = await Poll.create({
    topic,
    restriction,
    description,
    createdAt,
    expiresAt,
  });

  res.status(200).json({ msg: "Poll created succesfully" });
});

//* admin updates the poll from initial to final
////////////////////////////////////////////////////////////
const updateForVoting = asyncHandler(async (req, res) => {
  const { pollId } = req.params;
  const poll = await Poll.findById(pollId);
  if (!poll) {
    res.status(404);
    throw new Error(`no poll with id: ${pollId}`);
  }
  const currentDate = new Date();
  if (poll.expiresAt < currentDate && poll.startsAt > currentDate) {
    res.status(400);
    throw new Error("cannot modify this poll,regestration is going on!!");
  }
  const { topic, description, restriction, expireTime } = req.body;
  let startTime = req.body.startTime;
  if (startTime === undefined || startTime < 0) {
    startTime = 0;
  }
  if (!topic || !expireTime || expireTime < 0.5) {
    res.status(400);
    throw new Error("topic expire time and start time field cannot be empty");
  }
  console.log(startTime);
  let startAt = new Date(new Date().getTime() + startTime * 60 * 60 * 1000);
  poll.topic = topic;
  poll.phase = "final";
  poll.restriction = restriction;
  poll.description = description;
  poll.startsAt = startAt;
  poll.expiresAt = new Date(startAt.getTime() + expireTime * 60 * 60 * 1000);
  await poll.save();
  res.status(200).json(poll);
});

//* admin can view every poll
///////////////////////////////////////////////////////////////
const getAllPoll = asyncHandler(async (req, res) => {
  const polls = await Poll.find();
  res.status(200).json(polls);
});

//* admin can view poll of initial phase
//////////////////////////////////////////////////////////////
const getPollInitial = asyncHandler(async (req, res) => {
  const polls = await Poll.find({ phase: "Initial" });
  res.status(200).json(polls);
});

//* admin can view poll that is ready to be updated
/////////////////////////////////////////////////////////////
const getUpdateablePoll = asyncHandler(async (req, res) => {
  const polls = await Poll.find({
    expiresAt: { $lt: new Date() },
    phase: "Initial",
  });
  res.status(200).json(polls);
});

//* admin can view poll of final phase
///////////////////////////////////////////////////////////////
const getPollFinal = asyncHandler(async (req, res) => {
  const polls = await Poll.find({ phase: "Final" });
  res.status(200).json(polls);
});

//* admin can view poll which are completed!
//////////////////////////////////////////////////////////////
const getPollCompleted = asyncHandler(async (req, res) => {
  const polls = await Poll.find({ isCompleted: true });
  res.status(200).json(polls);
});

module.exports = {
  createPoll,
  updateForVoting,
  getAllPoll,
  getPollInitial,
  getPollFinal,
  getUpdateablePoll,
  getPollCompleted,
  getAllUsers,
  deleteUser,
  getReportedPosts,
  deleteReportedPost,
};
