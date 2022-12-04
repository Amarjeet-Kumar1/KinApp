const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('profile', {
        title: "Amar"
    });
    
}
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "KinApp | Sign Up"
    });
}

module.exports.singIn = function(req, res){
    return res.render('user_sign_in', {
        title: "KinApp | Sign In"
    });
}

module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in siging up'); return;}
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating user in siging up'); return;}
                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req, res){
    
}