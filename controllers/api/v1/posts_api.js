const Post = require('../../../models/post');
const User = require('../../../models/user');
const Comment = require('../../../models/comment');


module.exports.index = async function(req, res){
    let posts = await Post.find({}).
        sort('-createdAt').
        populate({path: 'user', select: 'name email avatar'}).
        populate({
            path: 'comments',
            options: {sort: {'createdAt': -1}},
            populate: {
                path: 'user',
                select: 'name email avatar'
            }
        });
    return res.status(200).json({
        message: "list of post",
        posts: posts
    });
}

module.exports.destroy = async function(req, res){
    try {
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            let userId = post.user;
            await post.remove();
            User.findByIdAndUpdate(userId, { $pull: {posts: req.params.id}});
            Comment.deleteMany({post: req.params.id});
            
            return res.status(200).json({
                message: "post and associated comment deleted"
            });
        
            

        } else {
            return res.status(401).json({
                message: "You cannot delete this post"
            });
        }
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({
            message: "internal server error"
        });
    }
    
}