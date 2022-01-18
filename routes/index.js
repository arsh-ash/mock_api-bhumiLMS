const express=require("express");
const router=express.Router();
const auth=require('./auth')
const course=require('./course')
const user=require('./user')
const homeController=require("../controller/Home_controller");

router.get("/",homeController.home);
router.use('/auth',auth)
router.use('/course',course)
router.use('/user',user)

module.exports=router;