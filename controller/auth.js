const User = require("../models/users");

//@desc    create User
//@route   POST /api/v1/auth/users
//@access  Public

exports.register = async (req, res, next) => {


    //   Create User
    try {
        const user = await User.create(req.body);

        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            data: user,
        });
    } catch (err) {
        // console.log('required error v2',err.errors.email.ValidatorError)
        res.status(404).json({
            message: `${err}`
        })
    }
}