const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');

//don't store client id here
//tell passport to user a new strategy to login
passport.use(new googleStrategy({
        clientID: "405408773258-evdmkd282r6roomgh5g9j6cc61qp4jlo.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        //find the user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('Error in google strategy passport', err); return;}
            console.log(profile);

            if(user){
                //if found, set this users as req.user
                return done(null, user);
            } else {
                //if not found, create the user set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    // avatar: profile.photos[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('Error in creating user', err); return;}
                    return done(null, user);
                });
            }
        })
    }

));

module.exports = passport;
