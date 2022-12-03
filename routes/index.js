const express = require('express');
//it will not gonna create instance of express
//it fetch existing instance
const router = express.Router();

const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);
router.get('/search', homeController.search);
router.use('/users', require('./user'));
router.use('/post', require('./post'));


module.exports = router;