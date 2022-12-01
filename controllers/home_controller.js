module.exports.home = function(req, res){
    return res.end('<h1>Express is up for KinApp</h1>');
}
module.exports.search = function(req, res){
    return res.end('<h1>Home search</h1>');
}