const express = require("express");
const router = express.Router();
const passport=require("passport");

const requestController=require("../controller/request_controller");

router.post("/create/:courseId/:instructorId",
passport.authenticate("jwt", { session: false }),
requestController.createRequest);

router.get("/allRequestOfInstructor",
passport.authenticate("jwt", { session: false }),
requestController.getAllRequestOfInstructor
)

router.post("/acceptRequest/:requestId",
passport.authenticate("jwt", { session: false }),
requestController.acceptRequest
)




module.exports = router;

