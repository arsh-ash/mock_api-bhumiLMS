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