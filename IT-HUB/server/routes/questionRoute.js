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
  getLatestQuestions,
  getQuestionByUser,
  getQuestionsByTag,
} = require("../controllers/questionController");

router.post("/", protect, upload.single("image"), createQuestion);
router.get("/mydiscussion/page/:pageNumber", protect, getQuestionByUser);
router.get("/page/:pageNumber", getQuestions);
router.get("/tag/:tagName/page/:pageNumber", getQuestionsByTag);
router.get("/latest/page/:pageNumber", getLatestQuestions);
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
module.exports = router;
