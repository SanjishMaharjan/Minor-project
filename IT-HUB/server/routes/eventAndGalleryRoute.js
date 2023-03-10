const router = require("express").Router();
const { protect } = require("../middleWare/authMiddleware");
const validateIds = require("../middleWare/validateIdsMiddleware");

const {
  getAllEvents,
  getEvent,
} = require("../controllers/eventAndGalleryController");

router.get("/", getAllEvents);
router.get("/:eventId", validateIds("eventId"), getEvent);
module.exports = router;
