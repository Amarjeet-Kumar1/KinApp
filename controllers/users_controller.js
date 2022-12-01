module.exports.profile = function(req, res){
    return res.end('<h1>User Profile</h1>');
}
module.exports.follower = function(req, res){
    return res.end('<h1> User followers</h1>');
}