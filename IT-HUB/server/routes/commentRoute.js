const router = require("express").Router({ mergeParams: true });
const { protect } = require("../middleWare/authMiddleware");
const validateIds = require("../middleWare/validateIdsMiddleware");
const {
  createComment,
  getComments,
  deleteComment,
  updateComment,
  upvoteComment,
  getUpvotes,
  verifyComment,
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

router.patch(
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

router.patch(
  "/comment/:commentId/verify",
  validateIds("questionId", "commentId"),
  protect,
  verifyComment
);

module.exports = router;
