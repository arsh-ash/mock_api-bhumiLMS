const express=require("express");
const router=express.Router();
const auth=require('./auth')
const course=require('./course')
const homeController=require("../controller/Home_controller");

router.get("/",homeController.home);
router.use('/users',auth)
router.use('/course',course)

module.exports=router;