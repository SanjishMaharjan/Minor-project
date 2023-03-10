const router = require("express").Router();
const { protect } = require("../middleWare/authMiddleware");
const validateIds = require("../middleWare/validateIdsMiddleware");
const {
  reportQuestion,
  reportComment,
} = require("../controllers/reportController");

router.post("/:questionId", validateIds("questionId"), protect, reportQuestion);

router.post(
  "/:questionId/:commentId",
  validateIds("questionId", "commentId"),
  protect,
  reportComment
);

module.exports = router;
