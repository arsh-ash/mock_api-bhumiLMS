const mongoose = require('mongoose');
const { Schema } = mongoose;

const sectionSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    labs:[{
     type:Schema.Types.ObjectId,
     ref:"Labs"
    }],
    lectures: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lectures"
        },
    ],
   
});

module.exports = mongoose.model("Sections", sectionSchema);