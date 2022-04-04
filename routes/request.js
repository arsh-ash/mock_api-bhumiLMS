const express = require("express");
const router = express.Router();
const passport=require("passport");

const requestController=require("../controller/request_controller");

router.post("/create/:courseId/:instructorId",
passport.authenticate("jwt", { session: false }),

requestController.createRequest);




module.exports = router;

