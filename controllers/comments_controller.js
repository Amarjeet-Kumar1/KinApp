const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
module.exports.create = function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err){console.log('error in finding user'); return;}
    
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
                    user.comments.push(comment);
                    user.save();
                    res.redirect('back');
                });
            }
        });
    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){console.log('error in finding comment'); return;}
        if((comment.user == req.user.id) || (req.params.postUserId == req.user.id)){
            let postId = comment.post;
            let userId = comment.user;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.commentId}}, function(err){
                if(err){console.log('error in finding comment id in post'); return;}
            });
            User.findByIdAndUpdate(userId, { $pull: {comments: req.params.commentId}}, function(err){
                if(err){console.log('error in finding comment id in user'); return;}
            });
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    })
}