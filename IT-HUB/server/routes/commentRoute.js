const router = require("express").Router({ mergeParams: true });
const { protect } = require("../middleWare/authMiddleware");
const {
  createComment,
  getComments,
  usersComment,
  deleteComment,
  updateComment,
  reportComment,
  upvoteComment,
  getUpvotes,
} = require("../controllers/commentController");

router.post("/comment", protect, createComment);
router.get("/comment", getComments);
router.delete("/comment/:commentId", protect, deleteComment);
router.patch("/comment/:commentId", protect, updateComment);
router.post("/comment/:commentId/report", protect, reportComment);
router.post("/comment/:commentId/upvote", protect, upvoteComment);
router.get("/comment/:commentId/upvote", getUpvotes);

module.exports = router;
