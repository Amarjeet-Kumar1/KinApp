const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');


module.exports.home = function(req, res){
        Post.find({}).populate('user').exec(function(err, posts){
            Comment.find({}, function(err, comment){

            return res.render('home', {
                title: "KinApp | Home",
                posts: posts,
                comments: comment
            });
        });
        });
        
}
module.exports.search = function(req, res){
    
    return res.render('search', {
        title: "search"
    });
}