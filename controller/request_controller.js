const User=require("../models/users")
module.exports.createRequest=async function(req,res){
    try {

        // console.log("REQ.USER",req.user);
        const user= await User.findById(req.user._id);

        const requestdata={
            ...req.body,
            courseId:req.params.courseId,
            instructorId:req.params.instructorId,
            studentId:req.user._id
        }
        console.log("request data",requestdata);
        // console.log("Boom",user);
        console.log("Request user",user)


        return res.status(200).json({
            message:"congo your are ttying to create the enroll rwquest"
        })
        
    } catch (error) {
        
        console.log("ERROR IN CATCH",error)
    }

}