const express=require("express");
const router=express.Router();
const auth=require('./auth')
const categories=require('./categories')
const user=require('./user')
const course=require("./courses")
const section=require("./section");
const homeController=require("../controller/Home_controller");

router.get("/",homeController.home);
router.use('/auth',auth)
router.use('/category',categories);
router.use('/user',user)
router.use("/course",course);
router.use("/section",section);

module.exports=router;