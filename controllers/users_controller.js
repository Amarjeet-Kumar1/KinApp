const User = require('../models/user');
const Post = require('../models/post');
const Friendship = require('../models/friendship');

const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

module.exports.profile = async function (req, res) {
  try {
    let user = await User.findOne(
      { _id: req.params.id },
      'name email avatar posts'
    ).populate({
      path: 'posts',
      options: { sort: { createdAt: -1 } },
      populate: [
        {
          path: 'user',
          select: 'name email avatar',
        },
        {
          path: 'comments',
          options: { sort: { createdAt: -1 } },
          populate: {
            path: 'user',
            select: 'name email avatar',
          },
        },
      ],
    });

    let sender = await Friendship.findOne({
      from_user: req.params.id,
      to_user: req.user.id,
    });
    let receiver = await Friendship.findOne({
      from_user: req.user.id,
      to_user: req.params.id,
    });
    // let from_user = await User.findOne({_id: req.params.id}, 'friendship').populate({path: 'friendship', match: {from_user: req.params.id}});
    // let to_user = await User.findOne({_id: req.params.id}, 'friendship').populate({path: 'friendship', match: {from_user: req.user.id}});

    // let post = await Post.find({user: req.params.id}).
    // sort('-createdAt').
    // populate({path: 'user', select: 'name email avatar'}).
    // populate({
    //     path: 'comments',
    //     options: {sort: {'createdAt': -1}},
    //     populate: {
    //         path: 'user',
    //         select: 'name email avatar'
    //     }
    // });

    // let user = await User.findOne({_id : req.params.id}, 'name email avatar friendship').populate({path: 'friendship', match: {from_user: {$eq : req.user.id}}});

    return res.render('user_profile', {
      title: 'User Profile',
      profile_user: user,
      sender: sender,
      receiver: receiver,
    });
  } catch (err) {
    console.log('error', err);
    return res.redirect('back');
  }
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log('**multer error', err);
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar && !user.avatar.includes('default_avatar.jpg')) {
            fs.unlinkSync(
              path.normalize(path.join(__dirname, '..', user.avatar))
            );
          }

          //store the path of uploaded file into the avatar field of user
          user.avatar = path.posix.join(User.avatarPath, req.file.filename);
        }
        user.save();
        req.flash('success', 'Profile Updated!!');
        return res.redirect('back');
      });
    } catch (err) {
      console.log('error', err);
      return res.redirect('back');
    }
  } else {
    req.flash('error', 'Unauthorized!');
    return res.status(401).send('unauthorized!');
  }
};

module.exports.signUp = function (req, res) {
  return res.render('user_sign_up', {
    title: 'KinApp | Sign Up',
  });
};

module.exports.signIn = function (req, res) {
  return res.render('user_sign_in', {
    title: 'KinApp | Sign In',
  });
};

module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash('error', "Password doesn't match!!");
    return res.redirect('back');
  }
  try {
    let userA = await User.findOne({ email: req.body.email });
    if (!userA) {
      let user = await User.create(req.body);
      req.flash('success', 'User created!');
      return res.redirect('/users/sign-in');
    } else {
      req.flash('error', 'User already exists, Please Sign in');
      return res.redirect('/users/sign-in');
    }
  } catch (err) {
    console.log('Error', err);
    return res.redirect('back');
  }
};

module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return console.log(err);
    }
    req.flash('success', 'You have logged out');
    return res.redirect('/');
  });
};
