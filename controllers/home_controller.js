const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const { populate } = require('../models/post');


module.exports.home = function(req, res){
        Post.find({}).
        populate('user').
        populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        }).
        exec(function(err, posts){
            User.find({}, function(err, users){
                if(err){console.log('error'); return;}
                return res.render('home', {
                    title: "KinApp | Home",
                    posts: posts,
                    all_user: users
                });
            });
            
        });
        
        
}
module.exports.search = function(req, res){
    
    return res.render('search', {
        title: "search"
    });
}