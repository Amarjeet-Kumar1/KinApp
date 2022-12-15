const User = require('../models/user');
const ResetToken = require('../models/reset_token');
const crypto = require('crypto');
const resetPasswordMailer = require('../mailers/reset_password_mailer');


module.exports.resetPassword = function(req, res){
    return res.render('reset_password/user_reset_password', {
        title: "Reset Password"
    });
}

// module.exports.checkEmail = function(req, res){
//     return res.render('reset-password/reset_check_email');
// }

module.exports.sendEmail = async function(req, res){

    try {
        let user = await User.findOne({email: req.body.email});
    if(!user){
        req.flash('error', 'User not found');
        return res.render('reset_password/user_not_found', {
            title: "User not found"
        });
    } else {
        
        let reset_token = await ResetToken.create({
            user: user._id,
            accessToken: crypto.randomBytes(20).toString('hex'),
            isValid: true
        });

        reset_token = await reset_token.populate('user', 'name email');

        resetPasswordMailer.newResetPassword(reset_token);
        
        return res.render('reset_password/reset_check_email', {
            title: "Reset Password",
            user_email: req.body.email 
        });

    }
    } catch (err) {
        console.log('Error', err);
        return res.redirect('/');
    }
    
}

module.exports.setPassword = async function(req, res){
    try {
        let reset_token = await ResetToken.findOne({accessToken: req.query.accessToken}).populate('user', 'name email');

        if(reset_token){
            if(reset_token.isValid){
                reset_token.isValid = false;
                reset_token.save();
                req.flash('success', 'Change your password in one attempt');
                return res.render('reset_password/set_password', {
                    title: "Reset Password",
                    user_email: reset_token.user.email,
                    tokenFound: true,
                    isValidToken: true
                });
            } else {
                req.flash('error', 'Session expired');
                return res.render('reset_password/set_password', {
                    title: "Session expired",
                    tokenFound: true,
                    isValidToken: false
                });
            }
        } else {
            req.flash('error', 'Invalid Request');
            return res.render('reset_password/set_password', {
                
                title: "invalid",
                tokenFound: false,
                isValidToken: false
            });
        }
    } catch (err) {
        console.log('Error', err);
        return res.redirect('/');
    }
   
}

module.exports.set = async function(req, res){
    try {
        if(req.body.password !== req.body.confirm_password){
            req.flash('error', 'password does not match');
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        
        user.password = req.body.password;
        user.save();
        req.flash('success', 'Password Changed!!');
    
        return res.redirect('/');
    } catch (err) {
        console.log('Error', err);
        return res.redirect('/');
    }
   

}