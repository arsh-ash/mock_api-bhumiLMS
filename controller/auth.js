const User = require("../models/users");
const jwt=require("jsonwebtoken");

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


exports.login=async function(req,res){
    console.log("arshhhhhhh",req.body.email);
    
    try{
        let user = await User.findOne({email: req.body.email});
        console.log("zzzzzzz",user);
    

        if (!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(user.toJSON(), 'Bhumi', {expiresIn:  '100000000'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }


}