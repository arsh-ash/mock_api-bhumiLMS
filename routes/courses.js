const express = require("express");
const {
  createCourse,
  deleteCourse,
  editCourse,
  getAllCourse,
} = require("../controller/course");
const passport = require("passport");
const router = express.Router();
router.post(
  "/createCourse",
  passport.authenticate("jwt", { session: false }),
  createCourse
);

router.delete(
  "/deleteCourse/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCourse
);
router.put(
  "/editCourse/:id",
  passport.authenticate("jwt", { session: false }),
  editCourse
);
router.get(
  "/getAllCourses",
  passport.authenticate("jwt", { session: false }),
  getAllCourse
);

module.exports = router;
