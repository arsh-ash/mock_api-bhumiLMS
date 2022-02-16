
const Course = require("../../models/course");
const Sections = require("../../models/sections")
const Lectures = require("../../models/lectures")
const fs = require("fs");
const path = require("path");


exports.createCourse = async (req, res, next) => {
  console.log("Api called");
  if(!req.body.title){
    res.status(404).json({
      success: false,
      message: "course title is missing",
    });

  }
  const courseObject = {
    ...req.body,
    courseCode:req.body.title+"501"
  };
  try {
    if (req.user.role == "admin") {
      
      const course = await Course.creat(courseObject);
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
      await Sections.deleteMany({courseId:req.params.courseId})
      await Lectures.deleteMany({courseId:req.params.courseId})
      ///// after delete this data you can delete course also
      
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
      
      /////
      if(req.file){
        let course = await Course.findById(req.params.id);
      if (!course) {
        res.status(404).json({
          success: false,
          message: "No such course found in database",
        });
      }
        Course.uploadedAvatar(req, res, function (err) {
          if (err) {
            console.log("multerError");
          }
        
          console.log("file namee req.file", req.file);
          // if (req.file) {
            if (course.thumbnail) {
              fs.unlinkSync(path.join(__dirname, "..", course.thumbnail));
            }
            // user.avatar = User.avatarPath + "/" + req.file + ".jpg";
            course.thumbnail = Course.avatarPath + "/" + req.file.filename;
          // }
          console.log("avatar", course.thumbnail);
          course.save();
          return res.status(200).json({
            message: "user updated succesfully",
          });
        });
  
       
      }
      const course = await Course.findByIdAndUpdate(req.params.id, req.body,{ new: true });
      

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
  /*
  user = await User.findById(req.user._id);
  console.log("booom", user);
  User.uploadedAvatar(req, res, function (err) {
    if (err) {
      console.log("multerError");
    }
    console.log("avatar", req.body.avatar);
    console.log("firstName", user.firstName);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    console.log("req.body", req.body);
    console.log("file namee req.file", req.file);
    if (req.file) {
      if (user.avatar) {
        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
      }
      // user.avatar = User.avatarPath + "/" + req.file + ".jpg";
      user.avatar = User.avatarPath + "/" + req.file.filename;
    }
    console.log("avatar", user.avatar);
    user.save();
    return res.status(200).json({
      message: "user updated succesfully",
      data: {
        token: jwt.sign(user.toJSON(), "Cloud", { expiresIn: "100000000" }),
      },
    });
  });
  */
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

exports.getAllCourse = async (req, res, next) => {
  console.log("Api called");

  try {
    const course = await Course.find(req.params.id);
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