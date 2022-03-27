const Course = require("../../models/course");
const Sections = require("../../models/sections");
const Lectures = require("../../models/lectures");
const fs = require("fs");
const path = require("path");
const { findByIdAndUpdate } = require("../../models/course");

exports.createCourse = async (req, res, next) => {
  console.log("Api called");
  if (!req.body.title) {
    res.status(404).json({
      success: false,
      message: "course title is missing",
    });
  }
  const courseObject = {
    ...req.body,
    courseCode: req.body.title + "501",
  };
  try {
    if (req.user.role == "admin") {
      const course = await Course.create(courseObject);
      res.status(200).json({
        success: true,
        message: "Course created successfully",
        data: course,
      });
    } else
      res.status(404).json({
        success: false,
        message: "You are not authorized to create course",
      });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
      ///// you have to delete all section and student who enrollerd in course /////
      await Sections.deleteMany({ courseId: req.params.courseId });
      await Lectures.deleteMany({ courseId: req.params.courseId });
      ///// after delete this data you can delete course also

      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
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
exports.editCourse = async (req, res, next) => {
  console.log("Api called edit course", req.params.id);
  let course = await Course.findById(req.params.id);
  console.log("finded course", course);
  try {
    if (req.user.role == "admin") {
      // console.log(req.user);
      Course.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("multerError", err);
        }
        if (req.file) {
          console.log("file hai");
          if (course.thumbnail) {
            // fs.unlinkSync(path.join(__dirname, "..", course.thumbnail));
          }
          course.thumbnail = Course.avatarPath + "/" + req.file.filename;
          // }
          console.log("avatar", course.thumbnail);
          course.save();

          return res.status(200).json({
            message: "photo updated successfully",
          });
        } 
          // async await chlega nahi or updated user k liye async await or return true chahiye
          Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            function (err, course) {
              if (err) {
                console.log(err);
              }
              console.log("again find", course);
              return res.status(200).json({
                success: "true",
                message: "till now also working fine",
                data: course,
              });
            }
          );
        
      });
    }
  } catch (error) {
    return console.log(error);
  }
};

// List Course
exports.getAllCourse = async (req, res, next) => {
  console.log("Api called");

  try {
    const course = await Course.find({}).populate("sections").populate({
      path:"sections",
      populate:{
        path:"lectures",
        select:"title video"
      }
    });
    console.log(course);
    if (course.length == 0) {
      return res.status(201).json({
        success: false,
        message: "No Course found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Following Course found in the database",
      data: course,
    });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

exports.getCourses = async (req, res, next) => {
  console.log("Api called edit course", req.params.courseId);

  try {
    const course = await Course.find({courseCode:req.params.courseId});
    console.log(course);
    if (!course) {
      return res.status(201).json({
        success: false,
        message: "No Course found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Following Course found in the database",
      data: course,
    });
  } catch (err) {
    console.log("Api Failed", err);
  }
};
