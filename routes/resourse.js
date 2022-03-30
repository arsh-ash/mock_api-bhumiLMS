const express=require("express");
const router=express.Router();
const passport=require("passport");
const { createResourse,
       editResourse,
       getAllResourse,
       deleteResourse

}=require("../controller/course/resourses")


router.post("/create/:courseId/:lectureId",
passport.authenticate("jwt", { session: false }),
createResourse
)


router.put("/edit/:resourseId",
passport.authenticate("jwt", { session: false }),
editResourse

)
router.get("/getAllResourse",
passport.authenticate("jwt", { session: false }),
getAllResourse
)

router.delete("/delete/:resourseId/:sectionId",
passport.authenticate("jwt", { session: false }),
deleteResourse

)


module.exports=router