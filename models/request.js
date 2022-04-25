const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new mongoose.Schema({
    instructorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref:"Courses",
        required: true
    }

},{
    timestamps:true
})

module.exports = mongoose.model("Request", requestSchema);
