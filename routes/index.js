const express=require("express");
const router=express.Router();
const auth=require('./auth')
const homeController=require("../controller/Home_controller");

router.get("/",homeController.home);
router.use('/users',auth)

module.exports=router;