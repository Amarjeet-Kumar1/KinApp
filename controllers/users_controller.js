module.exports.profile = function(req, res){
    return res.render('profile', {
        title: "Amar"
    });
}
module.exports.follower = function(req, res){
    return res.render('follower', {
        title: "follower"
    });
}