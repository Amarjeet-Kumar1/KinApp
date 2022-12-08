const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(err){console.log('error in finding post'); return;}
       
        if(post){
            Comment.create({
                comment: req.body.comment,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){console.log('error in commenting'); return;}
                post.comments.push(comment);
                post.save();
                res.redirect('back');
            });
        }
    });
}