const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add Name"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please enter email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add valid email address",
    ],
  },
  role: {
    type: String,
    enum: ["admin", "instructor", "student"],
    default: "student",
  },
  password: {
    type: String,
    // minlength: 6,
    // select: false, // it will not show the password when we fetch the user details
  },
  resetPasswordToken: {
    type: String,
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   } // we`ve done it to prevent it from running when we run forgot password API
  const salt = await bcrypt.genSalt(10); // 10 is basically number of rounds for security as you guessed more the better but heavier on the system and 10 is recommended
  this.password = await bcrypt.hash(this.password, salt);
});
// Match user entered password to the hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // this is the method which is gonna be called on actual user so it has access to the password
};

module.exports = mongoose.model("User", UserSchema);
