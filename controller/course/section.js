const Course = require("../../models/course");
const Section = require("../../models/sections");


exports.createSection = async (req, res, next) => {

  console.log("Api called");
  try {
    if (req.user.role == "admin") {
        let course =await Course.findById(req.params.courseId);
       
        if(course){
          const sectionObject = {
            ...req.body,
            courseId: req.params.courseId,
          };
            let section=await Section.create(sectionObject);
                
            course.sections.push(section);
            course.save();
            res.status(200).json({
              success: true,
              message: "Section created successfully",
              data: section,
            });
        }
      if (!course) {
        res.status(404).json({
          success: false,
          message: "No such course found in database",
        });
      }
     
    } else
      res.status(404).json({
        success: false,
        message: "You are not authorized to create Section",
      });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

exports.deleteSection = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
      ///// you have to delete all section and student who enrollerd in course /////
      // await Sections.deleteMany({ courseId: req.params.courseId });
      await Lectures.deleteMany({ sectionId: req.params.sectionId });
      ///// after delete this data you can delete course also

      await Section.findByIdAndDelete(req.params.sectionId);
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
exports.editSection = async (req, res, next) => {
  console.log("Api called edit course", req.params.id);
  let section = await Section.findById(req.params.sectionId);
  console.log("finded course", section);
  try {
    if (req.user.role == "admin") {
      console.log(req.user);
      let section = await Section.findByIdAndUpdate(
        req.params.sectionId,
        req.body,
        {new:true}
      );
      return res.status(200).json({
        success: "true",
        message: "till now also working fine",
        data: section,
      });
    }
  } catch (error) {
    return console.log(error);
  }
};

// List Course
exports.getAllSection = async (req, res, next) => {
  // console.log("Api called");

  try {
    const section = await Section.find({});
    // console.log(course);
    if (section.length == 0) {
      return res.status(201).json({
        success: false,
        message: "No Course found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Following Course found in the database",
      data: section,
    });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

exports.sectionsOfCourse=async function(req,res){
   console.log("req params",req.params.courseId);
  let data= await Course.findById(req.params.courseId)
  .populate({
    path:"sections",
    populate:{
      path:"lectures",
      select:"title"
    },
    populate:{
      path:"resourses",
      select:"title resourseFile"

    }

  })
  // path:"sections",
  //     populate:{
  //       path:"lectures",
  //       select:"title video"
  //     }
  
  console.log("here are the sections of course",data);
  return res.status(200).json({
    message:"sections of this courses are fatched",
    data:data,
  })
  

}

