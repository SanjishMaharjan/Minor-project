const router = require("express").Router();
const { upload } = require("../utils/fileUpload");
const { protect } = require("../middleWare/authMiddleware");
const validateIds = require("../middleWare/validateIdsMiddleware");

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
  getUpdatedQuestions,
} = require("../controllers/questionController");

router.post("/", protect, upload.single("image"), createQuestion);
router.get("/", getQuestions);
router.get("/liked", getLikedQuestions);
router.get("/recentlyupdated/:pageNumber", getUpdatedQuestions);
router.get("/:questionId", validateIds("questionId"), getQuestion);
router.delete(
  "/:questionId",
  validateIds("questionId"),
  protect,
  deleteQuestion
);
router.patch(
  "/:questionId",
  validateIds("questionId"),
  protect,
  updateQuestion
);
router.post(
  "/:questionId/report",
  validateIds("questionId"),
  protect,
  reportQuestion
);
router.post(
  "/:questionId/upvote",
  validateIds("questionId"),
  protect,
  upvoteQuestion
);
router.get("/:questionId/upvote", validateIds("questionId"), getupvotes);

module.exports = router;
