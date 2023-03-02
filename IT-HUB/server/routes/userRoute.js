const router = require("express").Router();
const validateIds = require("../middleWare/validateIdsMiddleware");
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  getProfile,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyUser,
  getImages,
  getAllImages,
} = require("../controllers/userController");
const { protect } = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");

router.post("/register", registerUser);
router.get("/profile/:id", validateIds("id"), protect, getProfile);
router.post("/verification/:verifyToken", verifyUser);
router.post("/login", loginUser);
router.get("/logout", protect, logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, upload.single("image"), updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.get("/getimages", getAllImages);
router.get("/getimages/:imagesId", getImages);

module.exports = router;
