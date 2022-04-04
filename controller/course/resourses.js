const Sections = require("../../models/sections");
const Resourses = require("../../models/resourses");
const Course = require("../../models/course");
const Lecture = require("../../models/lectures")

const fs = require("fs");
const path = require("path");

exports.createResourse = async (req, res, next) => {
 
  // if (
    
  //   !req.params.courseId &&
  //   // !req.params.sectionId &&
  //   !req.params.lectureId,
    
  // ) {
  //   res.status(404).json({
  //     success: false,
  //     message: "Lecture ti tle or courseId or sectionId is missing",
  //   });
  // }

  try {
    if (req.user.role == "admin") {
      let lecture = Lecture.findById(req.params.lectureId);
      let course = Course.findById(req.params.courseId);
      if (lecture && course) {
        const resourseObject = {
          ...req.body,
          courseId: req.params.courseId,
          lectureId: req.params.lectureId,
        };
        const resourse = await Resourses.create(resourseObject);
        console.log("Created resourse",resourse);
        await Lecture.findByIdAndUpdate(
          req.params.lectureId,
          { $push: { resource: resourse } },
          { new: true }
        );
        res.status(200).json({
          success: true,
          message: "resource created successfully",
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
  let resource = await Resourses.findById(req.params.resourseId);
  // console.log("RESOURCE",resourse);
  try {
    if (req.user.role == "admin") {
    
      Resourses.uploadedAvatar(req,res,function(err){
        if(err){
          console.log("error in multer",err)
        }
        if(req.file){
          if(resource.resourseFile){
            fs.unlinkSync(path.join(__dirname, "../..", resource.resourseFile));
           }
           resource.resourseFile = Resourses.avatarPath + "/" + req.file.filename;
           resource.save();



          // console.log("req.file",req.file);
          console.log("edited resourse",resource);
          return res.status(200).json({
            message:"now you are comming with file and resource updated successfully",
            data:resource
          })

        }
        else{
          Resourses.findByIdAndUpdate(req.params.resourseId,req.body,function(err,resource){
            if(err){
              console.log("error in edting resourse",err);
            }
            return res.status(200).json({
            message:"there is no file but other things changed",
            data:resource

          })


          })
          
          //  let resource=  Resourses.findByIdAndUpdate(req.params.resourseId,req.body,{new:true})
          // return res.status(200).json({
          //   message:"there is no file but other things changed",
          //   data:resource

          // })
        }
        


      })
     
      // // console.log(req.user);
      // Resourses.uploadedAvatar(req, res, function (err) {
      //   if (err) {
      //     console.log("multerError", err);
      //   }
      //   if (req.file) {
      //     let data = req.file.mimetype;
      //     let result = data.substring(0, 5);
      //     console.log("type", result);
      //     if (result == "image") {
      //       console.log("inside multer image");
      //       if (resourse.image) {
      //         console.log("resourse", resourse);
      //         console.log("dir", __dirname);

      //         fs.unlinkSync(path.join(__dirname, "../..", resourse.image));
      //       }
      //       resourse.image = Resourses.avatarPath + "/" + req.file.filename;

      //       console.log("avatar", resourse.image);
      //       resourse.save();
      //       console.log("resoursenew", resourse)


      //       return res.status(200).json({
      //         message: "photo updated successfully",
      //       });
      //     } else if (result == "video") {
      //       console.log("iside multer video");
      //       if (resourse.video) {
      //         fs.unlinkSync(path.join(__dirname, "../..", resourse.video));
      //       }
      //       resourse.video = Resourses.avatarPath + "/" + req.file.filename;

      //       console.log("avatar", resourse.video);
      //       resourse.save();

      //       return res.status(200).json({
      //         message: "resourse uploaded successfully",
      //       });
      //     }
        
      //   }

      // });

    }
    else{
      return res.status(200).json({
        message:"you are not authorised to edit the resourse"

      })
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
