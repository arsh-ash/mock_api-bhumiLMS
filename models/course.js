
const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require("path");
const multer = require("multer");
const IMAGES_PATH = path.join("/uploads/course/images");

const courseSchema = new Schema(
    {
        thumbnail: {
            type: String
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "Become an expert today.",
        },
        courseCode: {
            type: String,
            required: true
        },
        outline: {
            type: String,
        },
        duration: {
            type: String,
            default: "0 Hours",
        },
        sections: [
            {
                type: Schema.Types.ObjectId,
                ref: "Sections",
            },
        ],
        prerequisites: {
            type: Schema.Types.String,
        },
        author:
        {
            type: Schema.Types.ObjectId,
            ref: "Users",
           
        },
        category: {
            type: String,
        },
        welcomeMessage: {
            type: String
        },
        completionMessage: {
            type: String
        },
        isDraft: {
            type: Schema.Types.Boolean,
            default: false,
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
 
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
      cb(null, path.join(__dirname, "..", IMAGES_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
      console.log("file/file", file);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });
  // bahout kam ki bat form field name filename and single k andr vala name same hona chahiye
  
  courseSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
    "thumbnail"
  );
  courseSchema.statics.avatarPath = IMAGES_PATH;

module.exports = mongoose.model("Courses", courseSchema);
