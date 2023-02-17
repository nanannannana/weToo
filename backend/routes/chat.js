const User = require('../models/User');
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const db = require('../models');
const { Op } = require('sequelize');

router.post('/message', async (req, res, next) => {
  // console.log(req.body);
  const { chat, nickName, room } = req.body;
  try {
    const chatInfo = await Chat.create({
      User_nickName: nickName,
      MatePost_id: String(room),
      chat,
    });
    // console.log(chat);
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.send(true);
});

router.post('/load', async (req, res, next) => {
  // console.log(req.body);
  const { currentCrew, id, nickName } = req.body;
  const userCrewJoinTime = await db.sequelize.models.matePost_user_join.findOne(
    {
      where: {
        MatePost_id: currentCrew,
        User_id: id, //자동id여서 아이디값을 보내줘야한다.
      },
      attributes: ['createdAt'],
    }
  );
  // console.log(userCrewJoinTime);
  //유저가 방에 언제 입장한지 알아낸 후 그 이후의 대화만 보여주기 위해
  let offset = 0;
  const chatList = await Chat.findAll({
    where: {
      createdAt: { [Op.gt]: userCrewJoinTime },
    },
    order: [['id', 'DESC']],
    offset,
    limit: 10,
  });
  // console.log(chatList);

  res.send(chatList);
});

module.exports = router;
