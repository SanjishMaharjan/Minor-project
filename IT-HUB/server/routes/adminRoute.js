const router = require("express").Router();
const { isAdmin } = require("../middleWare/authMiddleware");
const {
  createPoll,
  getAllUsers,
  getReportedPosts,
  deleteReportedPost,
  deleteUser,
  getAllPoll,
  getPollInitial,
  getPollFinal,
  getUpdateablePoll,
  updateForVoting,
  getPollCompleted,
} = require("../controllers/adminController");

router.post("/poll", isAdmin, createPoll);
router.get("/poll", isAdmin, getAllPoll);
router.get("/poll/initial", isAdmin, getPollInitial);
router.get("/poll/final", isAdmin, getPollFinal);
router.get("/poll/updatable", isAdmin, getUpdateablePoll);
router.get("/poll/completed", isAdmin, getPollCompleted);
router.patch("/poll/:pollId", isAdmin, updateForVoting);
router.get("/users", isAdmin, getAllUsers);
router.get("/users/:userId", isAdmin, deleteUser);
router.get("/reported", isAdmin, getReportedPosts);
router.delete("/reported/:postId", isAdmin, deleteReportedPost);

module.exports = router;
