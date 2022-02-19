const express=require("express");
const router=express.Router();
const passport=require("passport");
const {
    createSection
}=require("../controller/course/section");


router.post("/create/:courseId",
passport.authenticate("jwt", { session: false }),
createSection);


module.exports=router