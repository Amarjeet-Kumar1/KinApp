const User = require('../models/user');
module.exports.profile = function(req, res){
    //if not query passed 
    //it means it doesn't redirected from sign in page
    //so back to sign in
    
    if(req.cookies.user_id ) {
        User.findById(req.cookies.user_id, function(err, user){
            if(err){console.log('error in loading profile'); 
            return res.redirect('back');}
            if(user){
            return res.render('user_profile', {
                title: "Profile",
                user: user
            });
            }
            else {
                if(err){console.log('error in loading profile'); 
                return res.redirect('back');}
            }
        });
    
    }
    else {
        return res.redirect('/users/sign-in');
    }
    
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

module.exports.signOut = function(req, res){
    res.cookie('user_id', '');
    return res.redirect('/users/sign-in');

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

    //find the user
    User.findOne({email: req.body.email}, function(err, user){
            if(err){console.log('Error in signing in'); return;}
            //handle user
            if(user){

                //handle passward if not match
                if(user.password != req.body.password){
                    console.log('password is wrong');
                    return res.redirect('back');
                }

                //handle session creation
                res.cookie('user_id', user._id);
                return res.redirect('/users/profile');
            }
            else {
                console.log('User not found'); 
                return res.redirect('back');
            }
    });
}