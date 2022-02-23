const express=require("express");
const router=express.Router();
const passport=require("passport");
const { createLecture,
       editLecture,
       getAllLecture

}=require("../controller/course/lecture")


router.post("/create/:courseId/:sectionId",
passport.authenticate("jwt", { session: false }),
createLecture
)

router.put("/edit/:lectureId",
passport.authenticate("jwt", { session: false }),
editLecture

)
router.get("/getAllLecture",
passport.authenticate("jwt", { session: false }),
getAllLecture
)



module.exports=router