const User = require('../models/User');
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

router.post('/message', async (req, res, next) => {
  console.log(req.body);
  const { chat, id, room } = req.body;
  try {
    const chatInfo = await Chat.create({
      User_id: id,
      MatePost_id: String(room),
      chat,
    });
    console.log(chat);
  } catch (error) {
    console.log(error);
    next(error);
  }
  res.send(true);
});

module.exports = router;
