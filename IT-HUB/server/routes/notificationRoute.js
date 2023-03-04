const router = require("express").Router();

const {
  getNotification,
  deleteNotification,
  getNotificationCount,
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

router.get("/count", protect, getNotificationCount);

module.exports = router;
