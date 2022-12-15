const express = require('express');
const router = express.Router();

const resetPassword = require('../controllers/reset_password_controller');

router.get('/', resetPassword.resetPassword);
// router.get('/check-email', resetPassword.checkEmail);
router.post('/send-email', resetPassword.sendEmail);
router.get('/set-password', resetPassword.setPassword);
router.post('/set', resetPassword.set);

 
module.exports = router;