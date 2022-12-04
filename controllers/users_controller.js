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
    //todo
}

module.exports.createSession = function(req, res){
    
}