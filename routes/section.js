const express=require("express");
const router=express.Router();
const passport=require("passport");
const {
    createSection,
    sectionsOfCourse
}=require("../controller/course/section");


router.post("/create/:courseId",
passport.authenticate("jwt", { session: false }),
createSection);

router.get("/sectionOfCourse/:courseId",
passport.authenticate("jwt", { session: false }),
sectionsOfCourse

);


module.exports=router