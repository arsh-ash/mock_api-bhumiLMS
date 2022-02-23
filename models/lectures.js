const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path=require("path");
const multer=require("multer");
const VIDEOS_PATH = path.join("/uploads/lectures/videos");

const lectureSchema = new Schema(
  {
    title: { type: String },
    number: { type: Number },
    description: { type: String, required: true },
    image: { type: String },
    video: { type: String },
    file: { type: String },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "Sections",
      required: true
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("File fetched", file);
    cb(null, path.join(__dirname, "..", VIDEOS_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("file/file", file);
    cb(null, "avatar" + "-" + uniqueSuffix);
  },
});

lectureSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
lectureSchema.statics.avatarPath = VIDEOS_PATH;

module.exports = mongoose.model("Lectures", lectureSchema);
