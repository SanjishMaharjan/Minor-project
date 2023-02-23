const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

//* specify file format that can be saved

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 4000000 } });

//* file size formatter

function formatFileSize(bytes) {
  var units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = 0;
  while (bytes >= 1024) {
    bytes = bytes / 1024;
    i++;
  }
  return bytes.toFixed(2) + " " + units[i];
}

module.exports = { upload, formatFileSize };
