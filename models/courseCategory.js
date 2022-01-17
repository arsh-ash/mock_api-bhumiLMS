const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: String, required: [true, "Please add Category"] },
});

module.exports = mongoose.model("Category", categorySchema);
