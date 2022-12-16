const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/sign-up', passport.isSignedIn, usersController.signUp);
router.get('/sign-in', passport.isSignedIn, usersController.signIn);
router.get('/sign-out', usersController.destroySession);

router.post('/create', usersController.create);
router.post('/update/:id',passport.checkAuthentication, usersController.update);
router.use('/forgot-password', require('./reset_password'));
router.use('/friendship', require('./friendship'));


//use passport as a middleware authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
) , usersController.createSession );

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/sign-in'}), usersController.createSession);

module.exports = router;