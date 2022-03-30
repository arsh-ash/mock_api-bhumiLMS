const mongoose = require("mongoose");
const LabsSchema = new mongoose.Schema({
    labName:{
        type:String,

    },
    url:{
        type:String
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Labs",LabsSchema);