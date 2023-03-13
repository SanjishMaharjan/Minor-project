const router = require("express").Router();
const { isAdmin } = require("../middleWare/authMiddleware");
const validateIds = require("../middleWare/validateIdsMiddleware");
const { upload } = require("../utils/fileUpload");
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
  uploadImages,
  removeReport,
  createEvent,
} = require("../controllers/adminController");

router.post("/poll", isAdmin, createPoll);
router.post("/event", isAdmin, createEvent);
router.patch(
  "/event/:eventId/images",
  isAdmin,
  validateIds("eventId"),
  upload.array("images"),
  uploadImages
);
router.get("/poll", isAdmin, getAllPoll);
router.get("/poll/initial", isAdmin, getPollInitial);
router.get("/poll/final", isAdmin, getPollFinal);
router.get("/poll/updatable", isAdmin, getUpdateablePoll);
router.get("/poll/completed", isAdmin, getPollCompleted);
router.patch("/poll/:pollId", validateIds("pollId"), isAdmin, updateForVoting);
router.get("/users", isAdmin, getAllUsers);
router.get("/users/:userId", validateIds("userId"), isAdmin, deleteUser);
router.get("/reported", isAdmin, getReportedPosts);
router.delete(
  "/reported/:reportId",
  validateIds("reportId"),
  isAdmin,
  deleteReportedPost
);
router.patch(
  "/reported/:reportId",
  validateIds("reportId"),
  isAdmin,
  removeReport
);

module.exports = router;
