module.exports.home = function(req, res){
    
    return res.render('home', {
        title: "Home"
    });
}
module.exports.search = function(req, res){
    return res.render('search', {
        title: "search"
    });
}