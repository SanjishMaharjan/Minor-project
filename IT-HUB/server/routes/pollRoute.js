const router = require("express").Router();
const { protect } = require("../middleWare/authMiddleware");
const {
  registerCandidate,
  getPollForCandidacy,
  getPollForVoting,
  voteCandidate,
  deletePoll,
} = require("../controllers/pollController");

router.post("/:pollId/register", protect, registerCandidate);
router.post("/:pollId/vote/:userId", protect, voteCandidate);
router.get("/register", getPollForCandidacy);
router.get("/", getPollForVoting);
router.delete("/:pollId", protect, deletePoll);

module.exports = router;
