const router = require("express").Router({ mergeParams: true });
const { protect } = require("../middleWare/authMiddleware");
const validateIds = require("../middleWare/validateIdsMiddleware");
const {
  createComment,
  getComments,
  deleteComment,
  updateComment,
  reportComment,
  upvoteComment,
  getUpvotes,
} = require("../controllers/commentController");

router.post("/comment", validateIds("questionId"), protect, createComment);
router.get("/comment", validateIds("questionId"), getComments);
router.delete(
  "/comment/:commentId",
  validateIds("questionId", "commentId"),
  protect,
  deleteComment
);
router.patch(
  "/comment/:commentId",
  validateIds("questionId", "commentId"),
  protect,
  updateComment
);
router.post(
  "/comment/:commentId/report",
  validateIds("questionId", "commentId"),
  protect,
  reportComment
);
router.post(
  "/comment/:commentId/upvote",
  validateIds("questionId", "commentId"),
  protect,
  upvoteComment
);
router.get(
  "/comment/:commentId/upvote",
  validateIds("questionId", "commentId"),
  getUpvotes
);

module.exports = router;
