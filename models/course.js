
const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema(
    {
        thumbnail: {
            type: String
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "Become an expert today.",
        },
        courseCode: {
            type: String,
            required: true
        },
        outline: {
            type: String,
        },
        duration: {
            type: String,
            default: "0 Hours",
        },
        sections: [
            {
                type: Schema.Types.ObjectId,
                ref: "sections",
            },
        ],
        prerequisites: {
            type: Schema.Types.String,
        },
        author:
        {
            type: Schema.Types.ObjectId,
            ref: "Users",
           
        },
        category: {
            type: String,
        },
        welcomeMessage: {
            type: String
        },
        completionMessage: {
            type: String
        },
        isDraft: {
            type: Schema.Types.Boolean,
            default: false,
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
 
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);


module.exports = mongoose.model("Courses", courseSchema);
