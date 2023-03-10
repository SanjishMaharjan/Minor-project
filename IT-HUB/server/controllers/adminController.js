const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Question = require("../models/questionModel");
const Comment = require("../models/commentModel");
const Report = require("../models/reportModel");
const { Poll, Candidate } = require("../models/pollModel");
const { sendEmail } = require("../utils/sendEmail");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Notification = require("../models/notificationModel");
const Event = require("../models/eventModel");

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
    .populate({
      path: "reportedOn",
      select: "question answer title",
    })
    .populate("reportedUser", "name image.imagePath")
    .sort({ count: -1 });
  res.status(200).json(reportedPosts);
});
//* Admin can delete the reported post
//////////////////////////////////////////////////////////////
const deleteReportedPost = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const report = await Report.findById(reportId)
    .populate({
      path: "reportedOn",
      select: "question answer title",
    })
    .populate("reportedUser", "name email");
  console.log(report.reportedOn);
  console.log(report.reportedUser);
  if (!report) {
    res.status(404);
    throw new Error(`no report with id: ${reportId}`);
  }
  if (report.onPost === "Question") {
    console.log("I am inside Question");
    //remove question
    const deletedQuestion = await Question.findByIdAndDelete({
      _id: report.reportedOn._id,
    });
    if (!deletedQuestion) {
      res.status(400);
      throw new Error(`could not delete question`);
    }

    await Comment.deleteMany({
      _id: deletedQuestion.comments.commentIds,
    });

    const notification = await Notification.deleteMany({
      post: deletedQuestion._id,
    });

    const count = notification.deletedCount;
    await User.findByIdAndUpdate(deletedQuestion.questioner, {
      $inc: { notification: -count },
    });

    if (deletedQuestion.image) {
      await cloudinary.uploader.destroy(deletedQuestion.image.imageId);
    }
  }
  if (report.onPost === "Comment") {
    console.log("I am inside Comment");
    //remove comment and decrease the contribution
    const deletedComment = await Comment.findByIdAndDelete({
      _id: report.reportedOn._id,
    });
    if (!deletedComment) {
      res.status(400);
      throw new Error("cannot delete the comment");
    }
    const noti = await Notification.findOneAndDelete({
      comment: deletedComment._id,
      viewed: false,
    });
    if (noti) {
      await User.findByIdAndUpdate(noti.user, {
        $inc: { notification: -1 },
      });
    }
    await User.findByIdAndUpdate(report.reportedUser._id, {
      $inc: { contribution: -5 },
    });
  }
  await Report.findByIdAndDelete(reportId);
  const message = `
    <h2>Hello ${report.reportedUser.name},</h2>
    <p>Reports on your post were reviewed by the admin and found to be valid.</p>
    <p>So your post has been removed by the admin.</p>
    <p>Please don't post unnecessary content or else your account will be deleted then you can't take part in events organized by the club and you as well receive more punishment from the college as well.</p>
    <p>Be more careful</p>
    <p>Reported Content:</p>
    <p>Regards...</p>
    <p>IT-Hub</p>
  `;
  const subject = `${report.onPost} Removed By Admin`;

  const sentFrom = process.env.EMAIL_USER;
  const sendTo = report.reportedUser.email;

  await sendEmail(subject, message, sendTo, sentFrom);

  res.status(200).json({ msg: "Success" });
});

//* admin removes the report
////////////////////////////////////////////////////
const removeReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const report = await Report.findByIdAndDelete(reportId);
  if (!report) {
    res.status(404);
    throw new Error(`no report with id: ${reportId}`);
  }

  if (report.onPost === "Question") {
    await Question.findByIdAndUpdate(report.reportedOn, { isReported: false });
  }
  if (report.onPost === "Comment") {
    await Comment.findByIdAndUpdate(report.reportedOn, { isReported: false });
    await User.findByIdAndUpdate(report.reportedUser, {
      $inc: { contribution: report.count },
    });
  }
  res
    .status(200)
    .json({ msg: `sucessfully removed report of ${report.onPost}` });
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
  await Poll.create({
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

//* admin uploads the image
/////////////////////////////////////////////////////////////
const uploadImages = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    res.status(404);
    throw new Error(`no event with id ${req.params.eventId}`);
  }
  if (req.files.length === 0) {
    res.status(400);
    throw new Error("no file is selected");
  }

  imageData = [{}];
  for (i = 0; i < req.files.length; i++) {
    uploadedFile = await cloudinary.uploader.upload(req.files[i].path, {
      folder: `IT-Hub/Event/Gallery`,
      resource_type: "image",
    });
    imageData[i] = {
      imageId: uploadedFile.public_id,
      imageName: req.files[i].originalname,
      imagePath: uploadedFile.secure_url,
    };
    fs.unlink(req.files[i].path, (err) => {
      if (err) console.log("error while deleting image");
    });
  }
  event.gallery.push(imageData);
  event.save();
  res.status(200).json(event);
});

//* admin creates the events
////////////////////////////////////////////////////
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, startDate, endDate, location } = req.body;
  if (!title || !description || !startDate || !endDate) {
    res.status(400);
    throw new Error("sorry necessary field cannot be letf empty");
  }

  imageData = [{}];
  for (i = 0; i < req.files.length; i++) {
    uploadedFile = await cloudinary.uploader.upload(req.files[i].path, {
      folder: `IT-Hub/Event/${title}`,
      resource_type: "image",
    });
    imageData[i] = {
      imageId: uploadedFile.public_id,
      imageName: req.files[i].originalname,
      imagePath: uploadedFile.secure_url,
    };
    fs.unlink(req.files[i].path, (err) => {
      if (err) console.log("error while deleting image");
    });
  }

  await Event.create({
    title,
    description,
    startDate,
    endDate,
    location,
    infoImages: imageData,
  });
  res.status(200).json({ msg: "succesfully created the Event" });
});
module.exports = {
  createPoll,
  createEvent,
  uploadImages,
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
  removeReport,
};
