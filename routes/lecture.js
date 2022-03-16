const express=require("express");
const router=express.Router();
const passport=require("passport");
const { createLecture,
       editLecture,
       getAllLecture,
       deleteLecture,
       lecturesOfSection

}=require("../controller/course/lecture")


router.post("/create/:courseId/:sectionId",
passport.authenticate("jwt", { session: false }),
createLecture
)

router.put("/edit/:lectureId",
passport.authenticate("jwt", { session: false }),
editLecture

)
router.delete("/delete/:lectureId/:sectionId",
passport.authenticate("jwt", { session: false }),
deleteLecture

)
router.get("/getAllLecture",
passport.authenticate("jwt", { session: false }),
getAllLecture
)
router.get("/lecturesOfSection/:sectionId",
passport.authenticate("jwt", { session: false }),
lecturesOfSection
)



module.exports=router