const express=require("express");
const app=express();
const port=5000;
const connectDB=require('./config/database')
connectDB();
const passport=require("passport");
const passportJWT=require("./config/passport-jwt-strategy");


app.use(express.json());
// app.use(express.urlencoded());
app.use(passport.initialize());
; // it will allow us to use req.body


app.use("/",require("./routes"));
app.listen(port,function(err){
    if(err){
        console.log("error in running server");
    }
    return console.log(`server is on port :${port}`);
})