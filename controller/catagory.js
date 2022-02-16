const { findOne, listenerCount } = require("../models/users");
const User = require("../models/users");
const Category = require("../models/courseCategory");

//@desc    Create Category
//@route   POST /course/deletecategory/61e519b1707c9a23a40cc811
//@access  Private
exports.createCategory = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
      const category = await Category.create(req.body);
      res.status(200).json({
        success: true,
        message: "Category created successfully",
        data: category,
      });
    } else
      res.status(404).json({
        success: false,
        message: "You are not authorized to create category",
      });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data: {},
      });
    } else
      res.status(404).json({
        success: false,
        message: "You are not authorized to delete category",
      });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

// Edit category
exports.editCategory = async (req, res, next) => {
  console.log("Api called");
  try {
    if (req.user.role == "admin") {
      let category = await Category.findById(req.params.id);
      if (!category) {
        res.status(404).json({
          success: false,
          message: "No such category found in database",
        });
      }

      category = await Category.findByIdAndUpdate(req.params.id, req.body);

      res.status(200).json({
        success: true,
        message: "Category edited successfully",
        data: category,
      });
    } else
      res.status(404).json({
        success: false,
        message: "You are not authorized to edit category",
      });
  } catch (err) {
    console.log("Api Failed", err);
  }
};

// List categories
exports.getAllCategories = async (req, res, next) => {
  console.log("Api called");

  try {
    const categories = await Category.find({});
    if (!categories) {
      res.status(201).json({
        success: false,
        message: "No categories found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Following categories found in the database",
      data: categories,
    });
  } catch (err) {
    console.log("Api Failed", err);
  }
};
