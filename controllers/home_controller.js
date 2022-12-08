const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = function(req, res){
    // Post.find({}, function(err,posts){
    //     if(err){console.log('error'); return;}
    //     return res.render('home', {
    //         title: "KinApp | Home",
    //         posts: posts,
    //         User: User
    //     });
    // });
        Post.find({}).populate('user').exec(function(err, posts){
            return res.render('home', {
                title: "KinApp | Home",
                posts: posts
            });
        });
        
    
    
    
}
module.exports.search = function(req, res){
    return res.render('search', {
        title: "search"
    });
}