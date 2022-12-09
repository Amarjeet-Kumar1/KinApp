const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
module.exports.create = async function(req, res){
    try {
        let user = await User.findById(req.user._id);
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                comment: req.body.comment,
                post: req.body.post,
                user: req.user._id
            });
                req.flash('success', 'Comment Added!');
                post.comments.push(comment);
                post.save();
                user.comments.push(comment);
                user.save();
                return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }    
}

module.exports.destroy = async function(req, res){
    try {
        let comment = await Comment.findById(req.params.commentId);
        if((comment.user == req.user.id) || (req.params.postUserId == req.user.id)){
            let postId = comment.post;
            let userId = comment.user;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.commentId}});
            await User.findByIdAndUpdate(userId, { $pull: {comments: req.params.commentId}});
            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this comment');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
    
    
}