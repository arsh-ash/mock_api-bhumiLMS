const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lectureSchema = new Schema(
  {
    title: { type: String },
    number: { type: Number },
    description: { type: String, required: true },
    image: { type: String },
    video: { type: String },
    file: { type: String },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "Sections",
      required: true
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("Lectures", lectureSchema);
