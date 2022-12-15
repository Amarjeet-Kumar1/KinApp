const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const Like = require('../models/like');


module.exports.create = async function(req, res){
    try {
        let user = await User.findById(req.user._id);
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        
        user.posts.push(post);
        user.save();
            //check if request is ajax request
            //type of ajax request is XMLHttpRequest (xhr)
            if(req.xhr){
                
                post = await post.populate('user', 'name avatar');

                return res.status(200).json({
                    data: {
                        post: post,
                    },
                    message: "Post Created!"
                });
            }
            req.flash('success', 'Post Published!');
            
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
            await Like.deleteMany({likeable: post._id, onModel: 'Post'});
            await Like.deleteMany({likeable: post.comments, onModel: 'Comment'});
            post.remove();
            await User.findByIdAndUpdate(userId, { $pull: {posts: req.params.id}});
            await Comment.deleteMany({post: req.params.id});
            
            
            if(req.xhr){
            
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
        
            req.flash('success', 'Post and its comments deleted!');
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