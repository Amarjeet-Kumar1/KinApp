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
            user.posts.push(post);
            user.save();
            return res.redirect('back');
    } catch (error) {
        console.log('Error', error);
        return;
    }    
        
}

module.exports.destroy = async function(req, res){
    try {
        let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){
        let userId = post.user;
        post.remove();
        await User.findByIdAndUpdate(userId, { $pull: {posts: req.params.id}});
        await Comment.deleteMany({post: req.params.id});
        return res.redirect('back');

    } else {
        return res.redirect('back');
    }
    } catch (err) {
        console.log('Error', err);
        return;
    }
    
}