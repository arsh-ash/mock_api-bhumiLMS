const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path=require("path");
const multer=require("multer");
const RESOURSE_PATH = path.join("/uploads/lectures/resourses");

const resourseSchema = new Schema(
  {
    title: {
       type: String ,
       required:true
      },
    // number: { type: Number },
    // description: { type: String, required: true },
    resourseFile: { type: String },
    lectureId: {
      type: Schema.Types.ObjectId,
      ref: "Lectures",
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
    cb(null, path.join(__dirname, "..", RESOURSE_PATH));
    
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)+".pdf";
    console.log("file/file", file);
    cb(null, "resource" + "-" + uniqueSuffix);
  },
});

resourseSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "resource"
);
resourseSchema.statics.avatarPath = RESOURSE_PATH;

module.exports = mongoose.model("Resource", resourseSchema);