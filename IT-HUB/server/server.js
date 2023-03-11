const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");

const { errorHandler } = require("./middleWare/errorMiddleWare");
const questionRoute = require("./routes/questionRoute");
const commentRoute = require("./routes/commentRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const pollRoute = require("./routes/pollRoute");
const notificationRoute = require("./routes/notificationRoute");
const eventAndGalleryRoute = require("./routes/eventAndGalleryRoute");
const reportRoute = require("./routes/reportRoute");
const aboutRoute = require("./routes/aboutRoute");

mongoose.set("strictQuery", true);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/question", questionRoute);
app.use("/api/:questionId", commentRoute);
app.use("/api/users", userRoute);
app.use("/api/poll", pollRoute);
app.use("/api/admin", adminRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/event", eventAndGalleryRoute);
app.use("/api/report", reportRoute);
app.use("/api/about", aboutRoute);

// const task = cron.schedule("*/5 * * * *", function () {
// const task = cron.schedule('0 0 * * 0', function() {
//   console.log("Resetting top contributor...");
// });

//* Error Middleware
app.use(errorHandler);
//* connect to database and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // task.start();
    app.listen(PORT, () => {
      console.log(`server running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
