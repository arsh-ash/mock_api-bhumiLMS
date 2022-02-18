
const Sections = require("../../models/sections")
const Lectures = require("../../models/lectures")
const fs = require("fs");
const path = require("path");


exports.createLecture = async (req, res, next) => {
  console.log("Api called");
  if(!req.body.title && !req.params.courseId && !req.params.sectionId && !req.body.description){
    res.status(404).json({
      success: false,
      message: "Lecture title or courseId or sectionId is missing",
    });

  }
  const lectureObject = {
    ...req.body,
    courseId:req.params.courseId,
    sectionId:req.params.sectionId
  };
  try {
    if (req.user.role == "admin") {
      
      const lecture = await Lectures.create(lectureObject);
      await Sections.findByIdAndUpdate(req.params.sectionId,{$push:{lectures:lecture}},{new:true})

      res.status(200).json({
        success: true,
        message: "Course created successfully",
        data: lecture,
      });
    } else
      res.status(404).json({
        success: false,
        message: "You are not authorized to create lecture",
      });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

exports.deleteLecture = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
      ///// you have to delete all section and student who enrollerd in course /////
    
      
      ///// after delete this data you can delete course also
      
      await Lecture.findByIdAndDelete(req.params.id);
      await Sections.findByIdAndUpdate(req.params.sectionId,{$pull:{lecture:req.params.id}});
      res.status(200).json({
        success: true,
        message: "lectures deleted successfully",
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
exports.editLecture = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
      
      /////check two condition for req.file type video and image ////////
      if(req.file){
        let lecture = await Lectures.findById(req.params.id);
      if (!lecture) {
        res.status(404).json({
          success: false,
          message: "No such lecture found in database",
        });
      }
        Lectures.uploadedAvatar(req, res, function (err) {
          if (err) {
            console.log("multerError");
          }
        
          console.log("file namee req.file", req.file);
          // if (req.file) {
            if (lecture.video) {
              fs.unlinkSync(path.join(__dirname, "..", lecture.video));
            }
            // user.avatar = User.avatarPath + "/" + req.file + ".jpg";
            lecture.video = Lectures.avatarPath + "/" + req.file.filename;
          // }
          console.log("avatar", lecture.video);
          lecture.save();
          return res.status(200).json({
            message: "user updated succesfully",
          });
        });
  
       
      }
      const lecture = await Lectures.findByIdAndUpdate(req.params.id, req.body,{ new: true });
      

      res.status(200).json({
        success: true,
        message: "Course edited successfully",
        data: lecture,
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
exports.getSectionLecture = async (req, res, next) => {
  console.log("Api called");

  try {
    const section = await Sections.findById(req.params.sectionId);
    if (section) { //check for empty array
      res.status(201).json({
        success: false,
        message: "No lecture found",
      });
    }
    section=await section.populate('lectures').execPopulate();
    res.status(200).json({
      success: true,
      message: "Following Course found in the database",
      data: section,
    });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

