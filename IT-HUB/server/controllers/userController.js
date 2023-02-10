const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const { sendEmail, validateEmail } = require("../utils/sendEmail");
const cloudinary = require("cloudinary").v2;

//* token to store on cookie
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//*                                             Register User
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, DOB, level } = req.body;

  //* Validation
  if (!name || !email || !password || !DOB || !level) {
    res.status(400);
    throw new Error("please fill in all required fields");
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error("password must be atleast 8 characters");
  }

  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Please use lec domain email to regester");
  }

  //* check if user email already exists
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  //* Create new user
  const user = await User.create({
    name,
    email,
    password,
    DOB,
    level,
  });

  if (user) {
    //* destructure user
    const { _id, name, email, image, DOB, level } = user;

    //* create verify token
    let verifyToken = crypto.randomBytes(32).toString("hex") + _id;
    console.log(verifyToken);
    //* hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    //* save token to database
    await new Token({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, //* 24 hrs
    }).save();

    //* construct verification url
    const verifyUrl = `${process.env.CLIENT_URL}/verification/${verifyToken}`;

    //* construct verification email
    const message = `
    <h2>Hello ${user.name}</h2>
    <p>please use the url below to verify your account</p>
    <a href=${verifyUrl} clicktracking=off>${verifyUrl}</a>
    <p>Regards...</p>
    <p>IT-Hub</p>
  `;
    const subject = "Account Verification";
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    try {
      await sendEmail(subject, message, send_to, sent_from);
      res.status(200).json({
        success: true,
        msg: "User registered",
        _id,
        name,
        email,
        DOB,
        image,
        level,
      });
    } catch (error) {
      res.status(500);
      throw new Error("Email not sent, please try again");
    }
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//*                                                 verify email
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const verifyUser = asyncHandler(async (req, res) => {
  const { verifyToken } = req.params;
  //* hash token to compare
  const hashedToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

  //* find token in database
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: {
      $gt: Date.now(),
    },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("invalid or expired token");
  }

  //*find user
  const user = await User.findOne({ _id: userToken.userId });
  if (!user) {
    res.status(404);
    throw new Error(`no user with id:${userToken.userId}`);
  }
  user.isVerified = true;
  await user.save();
  Token.deleteOne({ _id: userToken._id }, (err) => {
    if (err) throw new Error("unable to remove token");
  });
  //* Generate Token
  const token = generateToken(userToken.userId);

  //* send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //* 1 day
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ msg: "Verification Succesfull" });
});

//*                                                  LogIn User
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //* validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("please add email and password");
  }

  //* check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  //* user exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //* check if the user if verified

  const isVerified = await user.isVerified;
  if (!isVerified) {
    res.status(400);
    throw new Error("User is not verified");
  }

  //* Generate Token
  const token = generateToken(user._id);

  //* send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //* 1 day
    sameSite: "none",
    secure: true,
  });

  if (user && passwordIsCorrect) {
    const { _id, name, email, image, DOB, level, membership } = user;
    res.json({
      _id,
      name,
      email,
      image,
      DOB,
      level,
      membership,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//*                                                  LogOut User
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const logout = asyncHandler(async (req, res) => {
  //* send HTTP-only cookie
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "successfully logged out" });
});

//*                                                 Get User Date
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//* Get User data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("no user found");
  }
  const {
    _id,
    name,
    email,
    DOB,
    level,
    membership,
    image,
    isAdmin,
    facebook,
    instagram,
    twitter,
    linkedin,
  } = user;
  res.status(200).json({
    _id,
    name,
    email,
    DOB,
    level,
    membership,
    image,
    isAdmin,
    instagram,
    facebook,
    twitter,
    linkedin,
  });
});

//*                                             Get LogIn Status
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//* get login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  // verify token
  const isVerified = jwt.verify(token, process.env.JWT_SECRET);

  if (isVerified) return res.json(true);
  else return res.json(false);
});

//*            9845838010                                 Update User Data
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const updateUser = asyncHandler(async (req, res) => {
  // req.user contains user data  (passed by authMiddleware)
  const user = await req.user;
  imageData = {};
  if (req.file) {
    //* delete old image form cloudinary(not for default image)
    if (user.image.imageId != "") {
      const deleted = await cloudinary.uploader.destroy(user.image.imageId);
    }

    //* save new image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "IT-Hub",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Some error occured while uplaoding image");
    }

    imageData = {
      imageId: uploadedFile.public_id,
      imageName: req.file.originalname,
      imagePath: uploadedFile.secure_url,
    };
  }
  // update new value
  user.name = req.body.name || user.name;
  user.DOB = req.body.DOB || user.DOB;
  user.image = imageData.imagePath ? imageData : user.image;
  user.facebook = req.body.facebook || user.facebook;
  user.twitter = req.body.twitter || user.twitter;
  user.instagram = req.body.instagram || user.instagram;
  user.linkedin = req.body.linkedin || user.linkedin;
  // save to the database
  await user.save();
  res.status(200).json({ msg: "Succesfully updated the usere" });
});
//*                                                   Change Password
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { oldPassword, newPassword } = req.body;

  // Validate
  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("please add old and new password");
  }

  // check if old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // save new password

  if (passwordIsCorrect) {
    user.password = newPassword;
    await user.save();
    res.status(200).json({ msg: "password changed successfully" });
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

//*                                                  Forget Password
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("user doesnot exist");
  }

  //* Delete token if it exists in database
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //* create reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);
  //* hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //* save token to database
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 60 * 1000, //* 30 minutes
  }).save();

  //* construct reset url
  const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

  //* construct reset email
  const message = `
    <h2>Hello ${user.name}</h2>
    <p>please use te url below to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    <p>Regards...</p>
    <p>IT-Hub</p>
  `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  await sendEmail(subject, message, send_to, sent_from);
  res.status(200).json({ success: true, message: "reset email sent" });
});

//*                                                    Reset Password
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;
  //* hash token to compare
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //* find token in database
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: {
      $gt: Date.now(),
    },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("invalid or expired token");
  }

  //*find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  await Token.deleteOne({ _id: userToken._id }, (err) => {
    if (err) throw new Error("unable to delete token");
  });
  res.status(200).json({ message: "Password reset successful, please login" });
});

//*                                                  Export Modules
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  registerUser,
  verifyUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
