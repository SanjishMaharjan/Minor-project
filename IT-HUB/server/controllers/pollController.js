const { Poll, Candidate } = require("../models/pollModel");
const asyncHandler = require("express-async-handler");

//////////////////////////////////////////////////////////////////

//* user can register for candidacy if allowed
///////////////////////////////////////////////////////////////////
const registerCandidate = asyncHandler(async (req, res) => {
  const { _id, level } = req.user;

  const { pollId } = req.params;

  const poll = await Poll.findById(pollId);
  if (!poll) {
    res.status(400);
    throw new Error(`no poll with id:${pollId}`);
  }
  if (poll.expiresAt < new Date() || poll.phase === "final") {
    res.status(400);
    throw new Error("Time up you can't give candidacy");
  }
  const restricted = await poll.restriction.filter((e) => e === level);

  if (restricted.length !== 0) {
    res.status(401);
    throw new Error(`You are not allowed to apply for candidacy`);
  }

  const alreadyRegistered = await Candidate.findOne({
    userId: req.user._id,
    pollId,
  });
  if (alreadyRegistered) {
    res.status(400);
    throw new Error(`already registerd with id: ${req.user._id}`);
  }

  const candidate = await Candidate.create({ userId: _id, pollId });

  if (candidate) {
    await poll.candidates.push(candidate._id);
    await poll.save();
    res.status(200).json({ msg: "Succesfully regestered candidacy" });
  } else {
    res.status(500);
    throw new Error("failed to regester candidacy");
  }
});

//* get poll in which user can register for candidacy
/////////////////////////////////////////////////////////
const getPollForCandidacy = asyncHandler(async (req, res) => {
  const polls = await Poll.find({
    $and: [
      { phase: "initial" },
      { expiresAt: { $gt: new Date() } },
      { startsAt: { $lt: new Date() } },
    ],
  });
  res.status(200).json(polls);
});

//* get poll for voting candidates
//////////////////////////////////////////////////////////////////

const getPollForVoting = asyncHandler(async (req, res) => {
  const polls = await Poll.find({
    $and: [
      { phase: "final" },
      { expiresAt: { $gt: new Date() } },
      { startsAt: { $lt: new Date() } },
    ],
  });
  res.status(200).json(polls);
});

//* vote for candidate
////////////////////////////////////////////////////////////////

const voteCandidate = asyncHandler(async (req, res) => {
  const { pollId, userId } = req.params;
  const { _id, level } = req.user;

  const poll = await Poll.findById(pollId);
  if (!poll) {
    res.status(404);
    throw new Error(`no poll with id: ${pollId}`);
  }
  if (
    poll.phase != "Final" ||
    poll.startsAt > new Date() ||
    poll.expiresAt < new Date()
  ) {
    res.status(400);
    throw new Error("not allowed to vote on this poll");
  }

  const candidate = await Candidate.findOne({ userId });
  if (!candidate) {
    res.status(404);
    throw new Error(`no candidate with id:${userId}`);
  }
  const allowedToVote = poll.restriction.filter((e) => e === level).lenght == 0;
  if (!allowedToVote) {
    res.status(401);
    throw new Error(`User of level: ${level} not allowed to vote`);
  }

  const alreadyVoted = candidate.vote.voters.filer((e) => e == _id) != 0;
  console.log(alreadyVoted);
  if (alreadyVoted) {
    res.status(400);
    throw new Error("cannot vote more than once");
  }
  candidate.vote.voters.push(_id);
  candidate.vote.count += 1;
  await candidate.save();
  res.status(200).json({ msg: "voted successuflly" });
});

//*                      delete poll
/////////////////////////////////////////////////////////////////

const deletePoll = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error("not authorized");
  }
  const { pollId } = req.params;
  const { reason } = req.body;

  if (!reason) {
    res.status(400);
    throw new Error("reason should be specified");
  }

  const deletedPoll = await Poll.findByIdAndDelete(pollId);
  if (!deletedPoll) {
    res.status(400);
    throw new Error(`no poll with id: ${pollId}`);
  }
  if (
    deletedPoll.expiresAt > new Date() &&
    deletedPoll.createdAt < new Date()
  ) {
    const candidates = await Candidate.find({ pollId: deletedPoll._id })
      .select("userId")
      .populate("userId", "name email");
    const subject = "Poll deleted by the Admin";
    const sent_from = process.env.EMAIL_USER;
    candidates.forEach(
      asyncHandler(async (candidate) => {
        const message = `
        <h2>Hello, ${candidate.userId.name}</h1>
        <p>The poll on the topic "${deletedPoll.topic}" has been removed by the admin.</p>
        <p>Admin's Message: ${reason} </p>
        <p>Regards...</p>
        <p>IT-Hub</p>
      `;
        const send_to = candidate.userId.email;
        await sendEmail(subject, message, send_to, sent_from);
      })
    );
  }
  res.status(200).json(deletedPoll);
});

//*              update the winner of the poll
////////////////////////////////////////////////////////////////
const setWinner = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error("not authorized");
  }
  const { pollId } = req.params;

  const poll = await Poll.findById(pollId)
    .select("candidates")
    .populate("candidates", "userId votes.count");
  if (!poll) {
    res.status(404);
    throw new Error(`no poll with id: ${pollId}`);
  }

  if (poll.phase !== "final" && poll.expiresAt > new Date()) {
    res.status(400);
    throw new Error("poll is still running cannot decide the winner yet");
  }

  res.status(200).json(poll);
});

//*                 get all completed poll.
///////////////////////////////////////////////////////////////////
const pollResult = asyncHandler(async (req, res) => {
  const completedPoll = await Poll.find({ isCompleted: true })
    .populate({
      path: "candidates",
      select: "userId votes.count",
      populate: {
        path: "userId",
        select: "_id name email image.imagePath,",
      },
    })
    .sort({ votes: -1 })
    .populate("winner", "_id name , email, image.imagePath");
});

//* export modules

module.exports = {
  registerCandidate,
  getPollForCandidacy,
  getPollForVoting,
  voteCandidate,
  deletePoll,
};
