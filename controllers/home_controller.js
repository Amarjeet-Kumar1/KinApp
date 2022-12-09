const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const { populate } = require('../models/post');


module.exports.home = async function(req, res){
    try{
        let posts = await Post.find({}).
        populate('user').
        populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});

        return res.render('home', {
            title: "KinApp | Home",
            posts: posts,
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