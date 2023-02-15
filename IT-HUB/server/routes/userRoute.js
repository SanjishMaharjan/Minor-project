const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyUser,
} = require("../controllers/userController");
const { protect } = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");

router.post("/register", registerUser);
router.get("/verification/:verifyToken", verifyUser);
router.post("/login", loginUser);
router.get("/logout", protect, logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, upload.single("image"), updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", protect, resetPassword);

module.exports = router;
