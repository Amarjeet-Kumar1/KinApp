const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.sendRequest = async function(req, res){
    try {
        let friendship = await Friendship.create({
            from_user: req.user.id,
            to_user: req.query.to,
            accepted: false
        });
        
        req.flash('success', 'Friend Request Sent');
        return res.redirect('back');
    } catch (err) {
        console.log('Error in sending request', err);
        req.flash('error', 'Error in sending request');
        return res.redirect('back');
    }
    
}

module.exports.cancelRequest = async function(req, res){
    try {
        await Friendship.findByIdAndRemove(req.query.id);
        req.flash('success', 'Friend Request Canceled');
        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
        req.flash('error', 'Error in canceling request');
        return res.redirect('back');
    }
}

module.exports.acceptRequest = async function(req, res){
    try {
        
        let friendship = await Friendship.findById(req.query.id);
        let from_user = await User.findOne({_id : friendship.from_user});
        let to_user = await User.findOne({_id : friendship.to_user});
        if(friendship){
            friendship.accepted = true;
            friendship.save();
            from_user.friendship.push(friendship);
            await from_user.save();
            to_user.friendship.push(friendship);
            await to_user.save();
            res.flash('success', 'Request accepted');
        } else {
            req.flash('error', 'Request not found');
        }

        return res.redirect('back');
        

    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}

module.exports.removeFriend = async function(req, res){
    try {
        let friendship = await Friendship.findById(req.query.id);
        if(friendship){
            let from_user = friendship.from_user;
            let to_user = friendship.to_user;
            await friendship.remove();
            await User.findByIdAndUpdate(from_user, {$pull: {friendship: req.query.id}});
            await User.findByIdAndUpdate(to_user, {$pull: {friendship: req.query.id}});
            req.flash('success', 'Friend removed');
        } else {
            req.flash('error', 'Friend not found');
        }
        return res.redirect('back');
        

    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}