const express = require('express');
const router = express.Router();

const friendshipController = require('../controllers/friendship_controller');

router.get('/send-request', friendshipController.sendRequest);
router.get('/cancel-request', friendshipController.cancelRequest);
router.get('/accept-request', friendshipController.acceptRequest);
router.get('/remove-friend', friendshipController.removeFriend);

module.exports = router;