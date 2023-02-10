const Question = require("../models/questionModel");
const asyncHandler = require("express-async-handler");
const Report = require("../models/reportModel");
const Comment = require("../models/commentModel");

//*                       create question
////////////////////////////////////////////////////////////////

const createQuestion = asyncHandler(async (req, res) => {
  const { question, tag } = req.body;

  if (!question) {
    res.status(400);
    throw new Error("question field cannot be empty!");
  }

  const savedQuestion = await Question.create({
    question: question,
    tag: tag,
    questioner: req.user._id,
  });
  res.status(200).json(savedQuestion);
});

//*                              get questions
////////////////////////////////////////////////////////////////////

const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find().populate(
    "questioner",
    "name email image.imagePath _id"
  );
  res.status(200).json(questions);
});

//* get most liked questions
/////////////////////////////////////////////////////////////////////////
const getLikedQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find()
    .populate("questioner", "name email image.imagePath _id")
    .sort({ "upvote.count": -1 });
  res.status(200).json(questions);
});

//*                          get a single question
/////////////////////////////////////////////////////////////////////////

const getQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const question = await Question.findById(questionId).populate(
    "questioner",
    "_id name email image.imagePath"
  );
  if (!question) {
    return res.status(404).json(`no question with id: ${questionId}`);
  } else {
    return res.status(200).json(question);
  }
});

//*                      delete a single question
/////////////////////////////////////////////////////////////////////////

const deleteQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const { _id } = req.user;
  const question = await Question.findById(questionId);
  if (!question) {
    res.status(404);
    throw new Error(`no question with id: ${questionId}`);
  }

  if (_id.toString() !== question.questioner.toString()) {
    res.status(400);
    throw new Error(`not authorized to delete the question`);
  }
  const deletedQuestion = await Question.findByIdAndDelete(questionId);
  const deletedComments = await Comment.deleteMany({
    _id: deletedQuestion.comments,
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

//*                 Get all questions of a current User
////////////////////////////////////////////////////////////////////////////

// //? where to put this module
// //! think carefully
// //? Maybe on profile controller maybe
// //? Maybe here why make new controller to fetch question again if it can be done here
// const getQuestionByUser = async (req, res) => {
//   try {
//     const questions = await Question.find({ questioner: req.user._id });
//     if (!questions) {
//       return res.status(404).json({ msg: "no questions by the user" });
//     }
//     return res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

//*                         Handle Report!!
///////////////////////////////////////////////////////////////

const reportQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  const question = await Question.findById(questionId);
  if (!question) {
    res.status(404);
    throw new Error(`no question by id:${questionId}`);
  }

  const { reason } = req.body;
  if (!reason) {
    res.status(400);
    throw new Error("reason cannot be empty");
  }

  //* check if it has already been reported or not
  //todo: If it hasn't been reported create new report and also set the isReported flag of question
  if (!question.isReported) {
    await Report.create(
      {
        reportedOn: questionId,
        reasons: reason,
        reportedUser: question.questioner,
        count: 1,
      },
      (err, report) => {
        if (err) throw new Error("failed to create report");
        else {
          question.isReported = true;
          question.save();
          res.status(200).json(report);
        }
      }
    );
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

//*                         Handle Likes!!!
////////////////////////////////////////////////////////////////////

const upvoteQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  let question = await Question.findById(questionId);
  if (!question) {
    res.status(404);
    throw new Error(`No question with id:${questionId}`);
  }

  const alreadyUpvoted =
    question.upvote.upvoters.filter(
      (e) => e.toString() === req.user._id.toString()
    ).length > 0;
  let operation = alreadyUpvoted ? "$pull" : "$push";
  question = await Question.findOneAndUpdate(
    { _id: questionId },
    {
      $inc: { "upvote.count": alreadyUpvoted ? -1 : 1 },
      [operation]: { "upvote.upvoters": req.user._id },
    },
    { new: true }
  );

  res.status(200);
  res.json(question.upvote.count);
});

//* get number of likes on question
///////////////////////////////////////////////////////////
const getupvotes = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const question = await Question.findById(questionId);
  if (!question) {
    res.status(404);
    throw new Error(`no question with id:${questionId}`);
  }
  res.status(200).json({ upvote: question.upvote.count });
});

//*                          export Modules
//////////////////////////////////////////////////////////////////////

module.exports = {
  createQuestion,
  getQuestions,
  getLikedQuestions,
  getQuestion,
  deleteQuestion,
  updateQuestion,
  reportQuestion,
  upvoteQuestion,
  getupvotes,
};
