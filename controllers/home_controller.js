const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');



module.exports.home = async function(req, res){
    try{
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
        let users = await User.find({}, 'name');
        let friendArray = [];
        if(req.user){
        let user = await User.findById(req.user._id, 'name friendship').
        populate(
            {
                path: 'friendship',
                options: {sort: {'updatedAt': -1}},
                populate: [
                    {
                        path: 'from_user',
                        select: 'name avatar'
                    },
                    {
                        path: 'to_user',
                        select: 'name avatar'
                    }
                ]
            });
        
        user.friendship.forEach(element => {
            if(element.from_user._id !== req.user._id){
                friendArray.push(element.from_user);
            } else {
                friendArray.push(element.to_user);
            }
            
        });
    }


        return res.render('home', {
            title: "KinApp | Home",
            posts: posts,
            friends: friendArray,
            all_user: users
        });
    } catch(err){
        console.log('Error', err);
        return;
    }
        
        
}
module.exports.search = function(req, res){
    
    return res.render('search', {
        title: "search"
    });
}