const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be empty"],
    },
    email: {
      type: String,
      required: [true, "please add a email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please add a password"],
      minLength: [8, "password must be up to 8 characters"],
    },
    image: {
      type: Object,
      default: {
        imagePath:
          "https://res.cloudinary.com/df9xqsage/image/upload/v1677556710/IT-Hub/Profile/rfjlxxnknwcoga0rhnpc.jpg",
        imageName: "Default Image",
        imageId: "nan",
      },
    },
    DOB: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    notification: {
      type: Number,
      default: 0,
      min: 0,
    },
    contribution: {
      type: Number,
      default: 0,
    },
    membership: {
      type: String,
      enum: [
        "President",
        "Vice-President",
        "Secretary",
        "Vice-Secretary",
        "Treasurer",
        "Member",
        "Student",
      ],
      default: "Student",
    },
    level: {
      type: String,
      enum: [
        "First Semester",
        "Second Semester",
        "Third Semester",
        "Fourth Semester",
        "Fifth Semester",
        "Sixth Semester",
        "Seventh Semester",
        "Eighth Semester",
      ],
    },
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//* Encrypt password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //* hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
