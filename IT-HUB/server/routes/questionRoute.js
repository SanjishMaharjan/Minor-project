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
} = require("../controllers/questionController");

router.post("/", protect, upload.single("image"), createQuestion);
router.get("/page/:pageNumber", getQuestions);
router.get("/latest/:pageNumber", getLatestQuestions);
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
