const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

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
            post.comments.push(comment);
            await post.save();
            user.comments.push(comment);
            await user.save();
            comment = await comment.populate('user', 'name email avatar');
            // commentsMailer.newComment(comment);

            //create a new job in queue
            //if queue is not present create queue
            // let job =  queue.create('emails', comment).save(function(err){
            //     if(err){
            //         console.log('Error in creating queue', err);
            //         return;
            //     }
            //     console.log('job unqueued',job.id);
            // });
            if(req.xhr){
                
                return res.status(200).json({
                    data: {
                        comment: comment,
                    }, 
                    message: "Comment created"
                });
            }
                
                
                req.flash('success', 'Comment Added!');
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
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.commentId}});
            await User.findByIdAndUpdate(userId, { $pull: {comments: req.params.commentId}});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.commentId
                    },
                    message: "Comment Deleted"
                });
            }

            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
    
    
}