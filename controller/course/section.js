const Course = require("../models/course");
const Section = require("../models/section");


exports.createSection = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
        let course =await Course.findById(req.params.courseId);
        if(course){
            let section=await Section.create(req.body);
                
            course.sections.push(section);
            course.save();
        }
      if (!course) {
        res.status(404).json({
          success: false,
          message: "No such course found in database",
        });
      }
      res.status(200).json({
        success: true,
        message: "Section created successfully",
        data: section,
      });
    } else
      res.status(404).json({
        success: false,
        message: "You are not authorized to create Section",
      });
  } catch (err) {
    console.log("Api Failed", err);
  }
};