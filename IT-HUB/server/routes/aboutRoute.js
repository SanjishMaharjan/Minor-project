const router = require("express").Router();
const { getMembers } = require("../controllers/aboutController");

router.get("/", getMembers);

module.exports = router;
