const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');


module.exports.create = async function(req, res){
    try {
        let user = await User.findById(req.user._id);
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
            //check if request is ajax request
            //type of ajax request is XMLHttpRequest (xhr)
            if(req.xhr){
                
                
                return res.status(200).json({
                    data: {
                        post: post
                    },
                    message: "Post Created!"
                });
            }
            req.flash('success', 'Post Published!');
            user.posts.push(post);
            user.save();
            return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }    
        
}

module.exports.destroy = async function(req, res){
    try {
        let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){
        let userId = post.user;
        post.remove();
        User.findByIdAndUpdate(userId, { $pull: {posts: req.params.id}});
        Comment.deleteMany({post: req.params.id});
        req.flash('success', 'Post and its comments deleted!');
        if(req.xhr){
           
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted"
            });
        }

        
        return res.redirect('back');

    } else {
        req.flash('error', 'You cannot delete this post');
        return res.redirect('back');
    }
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
    
}