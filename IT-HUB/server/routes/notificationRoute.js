const router = require("express").Router();

const {
  getNotification,
  deleteNotification,
} = require("../controllers/notificationController");
const { protect } = require("../middleWare/authMiddleware");
const validateIds = require("../middleWare/validateIdsMiddleware");

router.get("/", protect, getNotification);
router.delete(
  "/:notificationId",
  validateIds("notificationId"),
  protect,
  deleteNotification
);

module.exports = router;
