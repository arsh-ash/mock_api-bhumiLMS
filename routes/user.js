const express = require("express");
const {
  getCurrentuser,
  getIndividualUser,
  updateUser,
  forgetPassword,
  resetPassword,
  changePassword
} = require("../controller/user");
const passport = require("passport");

const router = express.Router();

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
router.post( "/forgetPassword",forgetPassword);
router.post( "/resetPassword/:id",resetPassword);
router.post("/changePassword",
passport.authenticate("jwt", { session: false }),
changePassword);


module.exports = router;
