const Challenge = require('../models/Challenge');
const MatePost = require('../models/MatePost');
const User = require('../models/User');

exports.My_info = async (req, res) => {
  console.log('정보확인', req.body);

  // db에서 유저 정보 불러오기
  const userInfo = await User.findOne({
    raw: true,
    where: { id: req.body.id },
    attributes: ['nickName', 'id', 'address', 'name'],
  });

  // db에서 기부금 정보 불러오기
  const amount = await Challenge.findAll({
    raw: true,
    where: { user_id: req.body.id },
    attributes: ['amount'],
  });

  // const crewInfo = await MatePost.findAll({
  //   raw: true,
  //   where: { User_nickName: req.body.nickname },
  //   attributes: ['title', 'info'],
  // });

  // info: 유저 정보, amount: 기부금 총 합
  res.send({
    info: userInfo,
    amount: amount.reduce((a, c) => a + c.amount, 0),
    // crew: crewInfo,
  });
};
