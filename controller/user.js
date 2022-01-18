const User = require("../models/users");
const jwt = require("jsonwebtoken");
const forgetPassword_Mailer=require("../mailers/forgetpassword_mailer");
const crypto=require("crypto");

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

exports.forgetPassword=async function(req,res){
  let user=await User.findOne({email:req.body.email})
  if (user){
    let buffer= await crypto.randomBytes(32)
    let token=buffer.toString("hex");
    user.resetPasswordToken=token
    // user.expireTime=Date.now+3600000
    await user.save();
    forgetPassword_Mailer.forgetPassword(user);


  }else{
    return res.status(200).json({
      message:"email address is not registered"
    })
  }

  return res.status(200).json({
    message:'request is sussessful'
  })

}

exports.resetPassword= async function(req,res){

  let id=req.params.id
  console.log("hexa token",id);
  if(req.body.password==req.body.confirmPassword){
    let user= await User.findOne({resetPasswordToken:id})
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.save();
    return res.status(200).json({
      message:"Password changed successfully"
    })
  }
  else{
    return res.status(200).json({
      message:"password did not match"
    })
  }



}
exports.changePassword=async function(req,res){
  console.log("hiiiiiiiiiiiiiii")
  let user= await User.findOne({email:req.user.email});
  console.log(user);
  if(user.password==req.body.currentPassword){
    console.log("old passwod",user.password)
    console.log("current password",req.body.currentPassword);
     user.password=req.body.newPassword;
     user.save(function(err){
       if(err){
         console.log("cannot save user", err);
       }
     });
    console.log("newly saved user",user);
    return res.status(200).json({
      message:"xxxxxxxxxxxxxxxx"
    })
  }
  else{
    return res.status(200).json({
      message:"password did not match"
    })
  }

}