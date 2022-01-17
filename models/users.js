const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add your Name"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email address",
    ],
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["admin", "instructor", "student"],
    default: "student",
  },
  password: {
    type: String,
    required: [true, "Please add a password. Minimum length 6 characters"],
    minlength: 6,
    // select: false, // it will not show the password when we fetch the user details
  },
});

module.exports = mongoose.model("User", UserSchema);
