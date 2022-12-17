const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

//how mail should be send 
let transporter = nodemailer.createTransport(env.smtp);

//what should be send
let renderTamplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer', relativePath),
        data,
        function(err, template){
            if(err){console.log('Error in rendering tamplate', err); return;}
            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTamplate: renderTamplate
}