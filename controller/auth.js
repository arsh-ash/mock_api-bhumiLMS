const User = require("../models/users");
const jwt = require("jsonwebtoken");



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
  console.log("hhhiiii in login");
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log("user found", user);
    const password = req.body.password;
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
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

