const Question = require("../models/questionModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Report = require("../models/reportModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");

//*                       create question
////////////////////////////////////////////////////////////////

const createQuestion = asyncHandler(async (req, res) => {
  const { question, tag, title } = req.body;

  if (!question || !title) {
    res.status(400);
    throw new Error("question and title field cannot be empty!");
  }

  imageData = {};
  if (req.file) {
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "IT-Hub/Question",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Some error occured while uplaoding image");
    }

    imageData = {
      imageId: uploadedFile.public_id,
      imageName: req.file.originalname,
      imagePath: uploadedFile.secure_url,
    };
    await fs.unlink(req.file.path, (err) => {
      if (err) console.log("error while deleting image");
    });
  }

  const savedQuestion = await Question.create({
    question,
    title,
    tag,
    questioner: req.user._id,
    image: imageData,
  });
  res.status(200).json(savedQuestion);
});

//* find the most used tag in question
////////////////////////////////////////
const mostUsedTag = asyncHandler(async () => {
  const tags = await Question.aggregate([
    { $unwind: "$tag" },
    {
      $group: {
        _id: "$tag",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);
  return tags;
});

//*                              get all questions
////////////////////////////////////////////////////////////////////

const getQuestions = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const pageNumber = req.params.pageNumber || 1;
  const totalQuestions = (await Question.countDocuments()) / pageSize;
  const questions = await Question.find()
    .populate("questioner", "name image.imagePath")
    .populate({
      path: "comments.commentIds",
      select: "commenter -_id",
      populate: {
        path: "commenter",
        select: "image.imagePath -_id",
      },
    })
    .sort({ updatedAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const tags = await mostUsedTag();
  res.status(200).json({ totalQuestions, tags: tags, questions });
});

//*search by tags
//////////////////////////////////////////////////
const getQuestionsByTag = asyncHandler(async (req, res) => {
  const { tagName, pageNumber } = req.params;
  const pageSize = 20;
  const questions = await Question.find({ tag: tagName })
    .populate("questioner", "name image.imagePath")
    .populate({
      path: "comments.commentIds",
      select: "commenter -_id",
      populate: {
        path: "commenter",
        select: "image.imagePath -_id",
      },
    })
    .sort({ updatedAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const totalQuestions =
    (await Question.countDocuments({ tag: tagName })) / pageSize;
  const tags = await mostUsedTag();
  res.status(200).json({ totalQuestions, tags: tags, questions });
});
//* get most recently updated questions
/////////////////////////////////////////////////////////////////////////
const getLatestQuestions = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const pageNumber = req.params.pageNumber || 1;
  const totalQuestions = (await Question.countDocuments()) / pageSize;
  const questions = await Question.find()
    .populate("questioner", "name image.imagePath")
    .populate({
      path: "comments.commentIds",
      select: "commenter -_id",
      populate: {
        path: "commenter",
        select: "image.imagePath -_id",
      },
    })
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const tags = await mostUsedTag();
  res.status(200).json({ totalQuestions, tags: tags, questions });
});

//*                          get a single question
/////////////////////////////////////////////////////////////////////////

const getQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const question = await Question.findById(questionId)
    .populate("questioner", "_id name image.imagePath")
    .select("-comments.commentIds -__v");
  if (!question) {
    return res.status(404).json(`no question with id: ${questionId}`);
  } else {
    return res.status(200).json(question);
  }
});

//*                 Get all questions of a current User
////////////////////////////////////////////////////////////////////////////
const getQuestionByUser = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const pageNumber = req.params.pageNumber || 1;
  const totalQuestions =
    (await Question.countDocuments({ questioner: req.user._id })) / pageSize;
  const questions = await Question.find({ questioner: req.user._id })
    .populate("questioner", "name image.imagePath")
    .populate({
      path: "comments.commentIds",
      select: "commenter -_id",
      populate: {
        path: "commenter",
        select: "image.imagePath -_id",
      },
    })
    .sort({ updatedAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const tags = await mostUsedTag();
  res.status(200).json({ totalQuestions, tags: tags, questions });
});
//*                      delete a single question
/////////////////////////////////////////////////////////////////////////

const deleteQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const deletedQuestion = await Question.findOneAndDelete({
    _id: questionId,
    questioner: req.user._id,
  });
  if (!deletedQuestion) {
    res.status(400);
    throw new Error(`could not delete question with id: ${questionId}`);
  }

  if (deletedQuestion.image) {
    await cloudinary.uploader.destroy(deletedQuestion.image.imageId);
  }

  await Comment.deleteMany({
    _id: deletedQuestion.comments.commentIds,
  });

  const notification = await Notification.deleteMany({
    post: deletedQuestion._id,
  });
  await Report.findOneAndDelete({ reportedOn: deletedQuestion._id });
  const count = notification.deletedCount;
  await User.findByIdAndUpdate(deletedQuestion.questioner, {
    $inc: { notification: -count },
  });

  return res.status(200).json({
    msg: "question and comments related to the question has been deleted sucessfully",
  });
});

//*                        update single question
/////////////////////////////////////////////////////////////////////////

const updateQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const { _id } = req.user;
  const question = await Question.findById(questionId);
  if (!question) {
    return res.status(404).json({ msg: `no question with id: ${questionId}` });
  }
  if (_id.toString() === question.questioner.toString()) {
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json(updatedQuestion);
  } else {
    return res
      .status(400)
      .json({ msg: "not authenticated to update the question" });
  }
});

//*                          export Modules
//////////////////////////////////////////////////////////////////////

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionsByTag,
  getQuestionByUser,
  getLatestQuestions,
  getQuestion,
  deleteQuestion,
  updateQuestion,
};
