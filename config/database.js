const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect('mongodb+srv://mzuhaib:AVentadorlp700@cluster0.ypwbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    //its gonna return promise thats why we are using async await
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  });

  console.log(`MongoDB connected`);
};

module.exports=connectDB;