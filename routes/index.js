const express=require("express");
const router=express.Router();
const auth=require('./auth')
const categories=require('./categories')
const user=require('./user')
const course=require("./courses")
const section=require("./section");
const lecture=require("./lecture");
const conversationRoute=require("./conversation");
const messageRoute=require("./messeges")
const resourse=require("./resourse")
const homeController=require("../controller/Home_controller");

router.get("/",homeController.home);
router.use('/auth',auth)
router.use('/category',categories);
router.use('/user',user)
router.use("/course",course);
router.use("/section",section);
router.use("/lecture",lecture);
router.use("/resourse",resourse);
router.use("/api/conversations", conversationRoute);
router.use("/api/messages", messageRoute);

module.exports=router;