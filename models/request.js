const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    student: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref:"Courses",
        required: true
    }

},{
    timestamps:true
})

module.exports = mongoose.model("Request", requestSchema);
