const User = require("../models/users");
const jwt = require("jsonwebtoken");

//@desc    Get Current User
//@route   GET /user/getCurrentuser
//@access  Public

exports.getCurrentuser = async function (req, res) {
  try {
    let user = await User.findById(req.user.id);
    console.log("user found again", user);

    if (!user) {
      return res.json(422, {
        message: "No such user found",
      });
    }

    return res.status(200).json({
      message: "User Details fetched succfully",
      data: user,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//@desc    Get Individual User
//@route   GET /user/getIndividualUser
//@access  Public

exports.getIndividualUser = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    console.log("User found", user);

    if (!user) {
      return res.json(422, {
        message: "No such user found",
      });
    }

    return res.status(200).json({
      message: "User Details fetched succfully",
      data: user,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//@desc    Update User
//@route   GET /user/updateUser
//@access  Public

exports.updateUser = async function (req, res) {
  try {
    let user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true, // so that we get updated user in response
      runValidators: true,
    });
    console.log("User Updated", user);

    return res.status(200).json({
      message: "User Details updated succfully",
      data: user,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
