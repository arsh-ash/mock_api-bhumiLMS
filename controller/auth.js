const User = require("../models/users");
const jwt = require("jsonwebtoken");
const reader = require('xlsx')
// const path = require("../../../sample.xlsx")


exports.multi_register = async (req,res,next) => {

  console.log(req.body);
  const register_user = await User.find({});
  let email_of_reg_user = []

  for(let i = 0; i < register_user.length; i++)
{
   email_of_reg_user.push(register_user[i].email)
}


const file = reader.readFile("../../../user.xlsx")
  
let data = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}

let tobereg = data.filter((user) => !email_of_reg_user.includes(user.email))
// let tobereg = data.filter((user) => !register_user.includes(user.email))
  
// Printing data
console.log(data, data.length)
console.log("register user", email_of_reg_user)
console.log("tobe reg", tobereg , tobereg.length)
for(let i = 0; i < tobereg.length; i++)
{
  User.create(tobereg[i]);
 
}
res.status(200).json({
  success: true,
  message: "Users registered successfully",
});
  // console.log(req.body);
  // try {
  //   const user = await User.create(req.body);

  //   res.status(200).json({
  //     success: true,
  //     message: "User registered successfully",
  //     data: user,
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     message: `${err}`,
  //   });
  // }

}

exports.register = async (req, res, next) => {
  //   Create User
  console.log(req.body);
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      message: `${err}`,
    });
  }
};



exports.login = async function (req, res) {
  console.log("hhhiiii in login",req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log("user found", user);
    const password = req.body.password;
    // Check if password matches
    // const isMatch = await user.matchPassword(password);
    if (user && password !== user?.password) {
      console.log('Didnt match')
      // return next(new ErrorResponse("Password is invalid ", 401));
      return res.status(400).json({
        message: "Invalid password",
      });
    } else if (!user) {
      console.log('No user')
      return res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Sign in successful, here is your token",
      data: {
        token: jwt.sign(user.toJSON(), "Bhumi", { expiresIn: "100000000" }),
      },
    });
  } catch (err) {
    console.log('server Error',err)
    return res.status(500).json({
      message: err,
    });
  }
};

