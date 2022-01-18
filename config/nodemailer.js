const nodemailer=require("nodemailer");

let transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:"reacharsh1997", // generated ethereal user
      pass: "arsh@12131" // generated ethereal password
    }
  });

  module.exports=transporter;
