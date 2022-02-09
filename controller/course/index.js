
const Course = require("../models/course");


exports.createCourse = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
      const course = await Course.create(req.body);
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
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
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
exports.editCourse = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
      let course = await Course.findById(req.params.id);
      if (!course) {
        res.status(404).json({
          success: false,
          message: "No such course found in database",
        });
      }

      course = await Course.findByIdAndUpdate(req.params.id, req.body);

      res.status(200).json({
        success: true,
        message: "Course edited successfully",
        data: course,
      });
    } else
      res.status(404).json({
        success: false,
        message: "You are not authorized to edit course",
      });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

// List Course
exports.getAllCourse = async (req, res, next) => {
  console.log("Api called");

  try {
    const course = await Course.find({});
    if (!course) {
      res.status(201).json({
        success: false,
        message: "No Course found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Following Course found in the database",
      data: course,
    });
  } catch (err) {
    console.log("Api Failed", err);
  }
};