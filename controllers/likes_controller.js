const Likes = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggle = async function(req, res){
    try {
        

        let type; 
        let liked = false;
        if(req.query.type == 'Post'){
            type = await Post.findById(req.query.id);
        }
        else if(req.query.type == 'Comment'){
            type = await Comment.findById(req.query.id);
        }

        //check if like already exists
        let pLike = await Likes.findOne({user: req.user._id, likeable: req.query.id, onModel: req.query.type});
        if(!pLike){
            let nlike = await Likes.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            type.likes.push(nlike._id);
            type.save();
            liked = true;
            
            
            
        } else {
            type.likes.pull(pLike._id);
            type.save();
            pLike.remove();
            liked = false;
            
            
        }
        if(req.xhr){
            return res.status(200).json({
                data: {
                    like_no: type.likes.length
                },
                message: 'Liked'
            });
        }
        
        
        return res.redirect('back');
    } catch (err) {
        console.log('Error in liking', err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}