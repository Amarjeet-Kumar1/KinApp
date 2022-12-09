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
            req.flash('success', 'Profile Updated!');
            return res.redirect('back');
        });
    } else {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('unauthorized!');
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

module.exports.create = async function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Password doesn\'t match!!');
        return res.redirect('back');
    }
    try {
        let userA = await User.findOne({email: req.body.email});
        if(!userA){
            let user = await User.create(req.body);
            req.flash('success', 'User created!');
            return res.redirect('/users/sign-in');
        } else {
            req.flash('error', 'User already exists, Please Sign in');
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
    
}

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res,){
    req.logout(function(err){
        if(err){
            return console.log(err);
        }
        req.flash('success', 'You have logged out');
        return res.redirect('/');
    });
    
}