const router = require("express").Router();
const { upload } = require("../utils/fileUpload");
const { protect } = require("../middleWare/authMiddleware");
const validateIds = require("../middleWare/validateIdsMiddleware");

const {
  getAllImages,
  getImages,
  getAllEvents,
  getEvent,
} = require("../controllers/eventAndGalleryController");

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.get("/album", getAllImages);
router.get("/album/:albumId", validateIds("albumId"), getImages);
module.exports = router;
