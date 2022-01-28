const User = require("../models/users");
const jwt = require("jsonwebtoken");
const forgetPassword_Mailer = require("../mailers/forgetpassword_mailer");
const crypto = require("crypto");
const { findByIdAndUpdate } = require("../models/users");

//@desc    Get Current User
//@route   GET /user/getCurrentuser
//@access  Public

exports.getCurrentuser = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
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
    const user = await User.findById(req.params.id);
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
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
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

exports.forgetPassword = async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const buffer =  crypto.randomBytes(32);
    const token = buffer.toString("hex");
    user.resetPasswordToken = token;
    // user.expireTime=Date.now+3600000
    await user.save();
    forgetPassword_Mailer.forgetPassword(user);
  } else {
    return res.status(202).json({
      message: "Email address is not registered",
    });
  }

  return res.status(200).json({
    message: "Request is sussessful",
  });
};

exports.resetPassword = async function (req, res) {
  const id = req.params.id;
  console.log("hexa token", id);
  if (req.body.password == req.body.confirmPassword) {
    const user = await User.findOne({ resetPasswordToken: id });
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.save();
    return res.status(200).json({
      message: "Password changed successfully",
    });
  } else {
    return res.status(200).json({
      message: "password did not match",
    });
  }
};

exports.changePassword = async function (req, res) {
  console.log("hiiiiiiiiiiiiiii", req.user);
  const user = await User.findById(req.user.id);
  if (user.password == req.body.currentPassword) {
    if (user.password != req.body.newPassword) {
      user.password = req.body.newPassword;
      user.save();
      return res.status(200).json({
        message: "password changed",
      });
    } else {
      return res.status(201).json({
        message: "password cannot be same as previous password",
      });
    }
  } else {
    return res.status(202).json({
      message: "current password didn't match",
    });
  }
};

//@desc    Get all students
//@route   GET /user/getAllStudents
//@access  Public (for now)

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    if (students.length) {
      return res.status(200).json({
        success: true,
        message: "Students list fetched successfully",
        total: students.length,
        data: students,
      });
    } else
      return res.status(202).json({
        success: true,
        message: "No students enrolled yet",
        data: {},
      });
  } catch (err) {
    console.log("Request failed", err);
  }
};

//@desc    Get all admins
//@route   GET /user/getAllStudents
//@access  Public (for now)

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    if (admins.length) {
      return res.status(200).json({
        success: true,
        message: "Admins list fetched successfully",
        total: admins.length,
        data: admins,
      });
    } else
      return res.status(202).json({
        success: true,
        message: "No admins found",
        data: {},
      });
  } catch (err) {
    console.log("Request failed", err);
  }
};

//@desc    Get all intructors
//@route   GET /user/getAllInstructors
//@access  Public (for now)

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" });
    if (instructors.length) {
      return res.status(200).json({
        success: true,
        message: "Instructors list fetched successfully",
        total: instructors.length,
        data: instructors,
      });
    } else
      return res.status(202).json({
        success: true,
        message: "No instructors found",
        data: {},
      });
  } catch (err) {
    console.log("Request failed", err);
  }
};
