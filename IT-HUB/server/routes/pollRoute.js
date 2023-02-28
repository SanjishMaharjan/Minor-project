const router = require("express").Router();
const { protect } = require("../middleWare/authMiddleware");
const validateIds = require("../middleWare/validateIdsMiddleware");
const {
  registerCandidate,
  getPollForCandidacy,
  getPollForVoting,
  voteCandidate,
  deletePoll,
} = require("../controllers/pollController");

router.post(
  "/:pollId/register",
  validateIds("pollId"),
  protect,
  registerCandidate
);
router.post(
  "/:pollId/vote/:userId",
  validateIds("pollId", "userId"),
  protect,
  voteCandidate
);
router.get("/register", getPollForCandidacy);
router.get("/", getPollForVoting);
router.delete("/:pollId", validateIds("pollId"), protect, deletePoll);

module.exports = router;
