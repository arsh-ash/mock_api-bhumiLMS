const express = require("express");
const {
  createCourse,
  deleteCourse,
  editCourse,
  getAllCategories,
} = require("../controller/course");
const passport = require("passport");
const router = express.Router();
// router.post("/createCourse", createCourse);

router.get("/getAllCategories", getAllCategories);

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

module.exports = router;
