const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');


module.exports.create = function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err){console.log('error in finding user'); return;}
    
        Post.create({
            content: req.body.content,
            user: req.user._id
        }, function(err, post){
            if(err){console.log('error in creating a post'); return;}
            user.posts.push(post);
            user.save();
            return res.redirect('back');
        });
    });
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){console.log('error in finding post to delete'); return;}
        //.id means converting the object id into string
        if(post.user == req.user.id){
            let userId = post.user;
            post.remove();
            User.findByIdAndUpdate(userId, { $pull: {posts: req.params.id}}, function(err){
                if(err){console.log('error in finding post id in user'); return;}
            });
            Comment.deleteMany({post: req.params.id}, function(err){
                if(err){console.log('error in deleting comments'); return;}
                return res.redirect('back');
            });

        } else {
            return res.redirect('back');
        }
    });
}