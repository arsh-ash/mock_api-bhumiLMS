const User=require("../models/users")
const Course=require("../models/course")
const Request=require("../models/request");
const { findByIdAndUpdate, findById } = require("../models/users");
// const request = require("../models/request");
module.exports.createRequest=async function(req,res){
    try {
         if(req.user.role=="admin"){
         const requestdata={
            ...req.body,
            courseId:req.params.courseId,
            instructorId:req.params.instructorId,
            studentId:req.user._id
        }
        console.log("Request data",requestdata);

         let request=await Request.create(requestdata);
         let toInstructor=await User.findByIdAndUpdate(req.params.instructorId,
            {$push:{request:request} },
            {new:true}
            )

       
        console.log("updated request in instructor",toInstructor);
        // console.log("Boom",user);
        // console.log("Request user",user)


        return res.status(200).json({
            message:"congo your are ttying to create the enroll rwquest",
            data:toInstructor
        })
    }
    else{
        return res.status(200).json({
            message:"sorry! bro you are not allowed to enroll in any course"
        })
    }
        
    } catch (error) {
        
        console.log("ERROR IN CATCH",error)
    }

}


module.exports.getAllRequestOfInstructor=async function(req,res){
    myreq= await User.findById(req.user._id).populate("request")
    .populate({
        path:"request",
        populate:{
            path:"instructorId studentId courseId",
            

        }

    })

    console.log("reqForinstructor",myreq);
    return res.status(200).json({
        message:"all requests of intructor are available",
        data:myreq
    })
}

module.exports.acceptRequest=async function(req,res){
    let incominReq=await Request.findById(req.params.requestId);
    // console.log("requestto be accepted",incominReq);
    // console.log(incominReq.instructorId);
    // let instructor= await User.findById(incominReq.instructorId)
    // let student= await User.findById(incominReq.studentId)
    // let course= await Course.findById(incominReq.courseId);
    // console.log("INSTRUCTOR",instructor);
    // console.log("Student",student);
    // console.log("course",course);


    let updatedStudent= await User.findByIdAndUpdate(incominReq.studentId,
        {$push:{enrolledCourses:incominReq.courseId}},
        {new:true}
        )
        let updatedInstructor= await User.findByIdAndUpdate(incominReq.instructorId,
            { $pull:{request:req.params.requestId}},
             {new:true}
            )
       let updatedRequest=await Request.findByIdAndDelete(req.params.requestId);
    
    // console.log("updated student",updatedStudent);
    // console.log("updated instructor",updatedInstructor);
    // console.log("updated request",updatedRequest);
      return res.status(200).json({
        message:"student enrolled successfully",
        success:true

    })

}

module.exports.declineRequest=async function(req,res){
    try {
        let incominReq=await Request.findById(req.params.requestId);
        let updatedRequest=await Request.findByIdAndDelete(req.params.requestId);

 


    } catch (error) {
        console.log("internal server error",error);
    }


}