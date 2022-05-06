const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
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
  enrolledCourses:[{
    type:Schema.Types.ObjectId,
    ref:"Courses"

  }],
  request:[
    {
      type: Schema.Types.ObjectId,
      ref:"Request"
    }
],
  password: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
    if(this.password){
      const salt = await bcrypt.genSalt(10); 
      this.password = await bcrypt.hash(this.password, salt);
    }
  
});
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); 
};

module.exports = mongoose.model("User", UserSchema);
