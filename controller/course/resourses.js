const Sections = require("../../models/sections");
const Resourses = require("../../models/resourses");
const Course = require("../../models/course");
const fs = require("fs");
const path = require("path");

exports.createResourse = async (req, res, next) => {
  console.log("Api called arsh");
  if (
    !req.body.title &&
    !req.params.courseId &&
    !req.params.sectionId &&
    !req.body.description
  ) {
    res.status(404).json({
      success: false,
      message: "Lecture title or courseId or sectionId is missing",
    });
  }

  try {
    if (req.user.role == "admin") {
      let section = Sections.findById(req.params.sectionId);
      let course = Course.findById(req.params.courseId);
      if (section && course) {
        const resourseObject = {
          ...req.body,
          courseId: req.params.courseId,
          sectionId: req.params.sectionId,
        };
        const resourse = await Resourses.create(resourseObject);
        await Sections.findByIdAndUpdate(
          req.params.sectionId,
          { $push: { resourses: resourse } },
          { new: true }
        );
        res.status(200).json({
          success: true,
          message: "Course created successfully",
          data: resourse,
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "You are not authorized to create lecture",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteResourse = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
      ///// you have to delete all section and student who enrollerd in course /////

      ///// after delete this data you can delete course also

      await Resourses.findByIdAndDelete(req.params.resourseId);
      await Sections.findByIdAndUpdate(req.params.sectionId, {
        $pull: { resourses: req.params.resourseId },
      });
      res.status(200).json({
        success: true,
        message: "Resourses deleted successfully",
        data: {},
      });
    } else
      res.status(404).json({
        success: false,
        message: "You are not authorized to delete category",
      });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

// Edit course
exports.editResourse = async (req, res, next) => {
  console.log("Api called");
  // console.log("Api called edit course", req.params.id);
  let resourse = await Resourses.findById(req.params.resourseId);
  try {
    if (req.user.role == "admin") {
      // console.log(req.user);
      Resourses.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("multerError", err);
        }
        if (req.file) {
          let data = req.file.mimetype;
          let result = data.substring(0, 5);
          console.log("type", result);
          if (result == "image") {
            console.log("inside multer image");
            if (resourse.image) {
              console.log("resourse",resourse);
              console.log("dir",__dirname);

              fs.unlinkSync(path.join(__dirname, "../..", resourse.image));
            }
            resourse.image = Resourses.avatarPath + "/" + req.file.filename;

            console.log("avatar", resourse.image);
            resourse.save();
            console.log("resoursenew",resourse)


            return res.status(200).json({
              message: "photo updated successfully",
            });
          } else if (result == "video") {
            console.log("iside multer video");
            if (resourse.video) {
              fs.unlinkSync(path.join(__dirname, "../..", resourse.video));
            }
            resourse.video = Resourses.avatarPath + "/" + req.file.filename;

            console.log("avatar", resourse.video);
            resourse.save();

            return res.status(200).json({
              message: "video updated successfully",
            });
          }
        }
       
      });
      
    }
  } catch (error) {
    return console.log(error);
  }
 
};

// List Course
exports.getSectionResourse = async (req, res, next) => {
  console.log("Api called");

  try {
    const section = await Sections.findById(req.params.sectionId);
    if (section) {
      //check for empty array
      res.status(201).json({
        success: false,
        message: "No lecture found",
      });
    }
    section = await section.populate("resourses").execPopulate();
    res.status(200).json({
      success: true,
      message: "Following Course found in the database",
      data: section,
    });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

exports.getAllResourse = async function (req, res) {
  let resourse = await Resourses.find({});
  return res.status(200).json({
    message: "all resourse found succesfully",
    data: resourse,
  });
};
