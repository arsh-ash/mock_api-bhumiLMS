const express = require("express");
const {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
} = require("../controller/course");
const passport = require("passport");
const router = express.Router();
// router.post("/createCategory", createCategory);

router.get("/getAllCategories", getAllCategories);

router.post(
  "/createCategory",
  passport.authenticate("jwt", { session: false }),
  createCategory
);

router.delete(
  "/deleteCategory/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCategory
);
router.put(
  "/editCategory/:id",
  passport.authenticate("jwt", { session: false }),
  editCategory
);

module.exports = router;
