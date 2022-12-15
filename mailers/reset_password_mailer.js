const nodeMailer = require('../config/nodemailer');

exports.newResetPassword = (resetToken) => {
    let htmlString = nodeMailer.renderTamplate({resetToken: resetToken}, '/reset_password/reset_password.ejs');

    nodeMailer.transporter.sendMail({
        from: 'kinappserver@gmail.com',
        to: resetToken.user.email,
        subject: 'Reset Password | KinApp',
        html: htmlString
    }, (err, info) => {
        if(err){console.log('Error in sending mail', err); return;}

        console.log('Message send', info);
        return;
    });
}