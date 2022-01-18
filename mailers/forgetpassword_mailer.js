const transporter=require("../config/nodemailer");

// this is another way of exporting a method
exports.forgetPassword = (user) => {
    console.log('inside password mailer', user);
        transporter.sendMail({
       from: 'no-reply@gmail.com',
       to:user.email,
       subject: "New Comment Published!",
       html: `<p>You requested for password reset!! </p>
          <h5>${user.resetPasswordToken} </h5>`

    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent booom', info);
        return;
    });
}
