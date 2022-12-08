const User = require('../models/user');
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user

        });
    });  
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body ,function(err, user){
            if(err){console.log('error in updating'); return;}
            return res.redirect('back');
        });
    } else {
        return res.status(401).send('You are an idiot');
    }
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "KinApp | Sign Up"
    });
}

module.exports.signIn = function(req, res){
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
    return res.redirect('/');
}

module.exports.destroySession = function(req, res,){
    req.logout(function(err){
        if(err){
            return console.log(err);
        }
        return res.redirect('/');
    });
    
}