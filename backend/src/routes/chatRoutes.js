const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');

const { validateChat } = require('../middleware/validation');

router.post('/', validateChat, handleChat);

module.exports = router;
