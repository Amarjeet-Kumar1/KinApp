const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTamplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'kinappserver@gmail.com',
        to: comment.user.email,
        subject: 'New Comment published',
        html: htmlString
    },(err, info) => {
        if(err){console.log('Error in sending mail', err); return;}

        console.log('Message send', info);
        return;
    } );
} 