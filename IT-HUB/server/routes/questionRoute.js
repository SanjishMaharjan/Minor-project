const router = require("express").Router();
const { protect } = require("../middleWare/authMiddleware");

const {
  createQuestion,
  getQuestions,
  getQuestion,
  deleteQuestion,
  updateQuestion,
  reportQuestion,
  upvoteQuestion,
  getLikedQuestions,
  getupvotes,
} = require("../controllers/questionController");

router.post("/", protect, createQuestion);
router.get("/", getQuestions);
router.get("/liked", getLikedQuestions);
router.get("/:questionId", getQuestion);
router.delete("/:questionId", protect, deleteQuestion);
router.patch("/:questionId", protect, updateQuestion);
router.post("/:questionId/report", protect, reportQuestion);
router.post("/:questionId/upvote", protect, upvoteQuestion);
router.get("/:questionId/upvote", getupvotes);

module.exports = router;
