const express = require("express");
const {
  getCurrentuser,
  getIndividualUser,
  updateUser,
  forgetPassword,
  resetPassword,
  changePassword,
  getAllStudents,
  getAllAdmins,
  getAllInstructors
} = require("../controller/user");
const passport = require("passport");

const router = express.Router();

router.get("/getAllStudents", getAllStudents);
router.get("/getAllInstructors", getAllInstructors);
router.get("/getAllAdmins", getAllAdmins);
router.get(
  "/getCurrentuser",
  passport.authenticate("jwt", { session: false }),
  getCurrentuser
);
router.get(
  "/getIndividualUser/:id",
  passport.authenticate("jwt", { session: false }),
  getIndividualUser
);
router.post(
  "/updateUser",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword/:id", resetPassword);
router.post(
  "/changePassword",
  passport.authenticate("jwt", { session: false }),
  changePassword
);

module.exports = router;
