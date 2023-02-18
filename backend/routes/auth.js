const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { tokenCheck } = require('../middleware/tokenCheck');

router.post('/login', async (req, res, next) => {
  const { id, pw } = req.body;
  console.log(req.body);
  try {
    const userInfo = await User.findOne({
      where: { id },
      // attributes: ['nickName', 'id', 'pw'],
    });
    if (!userInfo) return res.status(403).send('유저 정보가 없습니다.');
    if (userInfo.pw != pw) {
      return res.status(403).send('비밀번호가 일치 하지 않습니다.');
    }
    delete userInfo.dataValues['pw'];
    console.log(userInfo.dataValues);
    //access 토큰 발급
    //3번쨰 인자는 발행자, 유효기간 등을 담을 수 있다.
    // const accessToken = jwt.sign({
    //   id: userInfo.id,
    //   name: userInfo.name,
    // },process.env.REFRESH_SECRET,{
    //   expiresIn: '24h',//1분
    //   issuer : 'we'
    // })

    const accessToken = jwt.sign(
      {
        type: 'JWT',
        id: userInfo.id,
        nickname: userInfo.nickname,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: '15m', // 만료시간 15분
        issuer: 'we',
      }
    );

    // token 전송
    res.cookie('accessToken', accessToken, {
      secure: false, //https, http차이 명시
      httpOnly: true,
    });

    res.status(200).json({
      message: '로그인 성공!',
      data: userInfo.dataValues,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/userinfo', tokenCheck, async (req, res, next) => {
  console.log(req.decoded);
  res.send('로그인 성공');
});

module.exports = router;
