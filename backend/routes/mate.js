const User = require('../models/User');
const express = require('express');
const router = express.Router();
const MatePost = require('../models/MatePost');

router.get('/', async (req, res, next) => {
  // console.log(req.query);

  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }

    const posts = await MatePost.findAll({
      where,
      limit: 10,
      // order: [
      //   ['id', 'DESC'],
      // ],
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['nickName'], //따로 user테이블에서 가져온다.
        },
      ],
    });
    // console.log(posts);

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/addcrew', async (req, res, next) => {
  const { nickName, id } = req.body;
  try {
    const matePost = await MatePost.findOne({ where: { id } });
    if (!matePost) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await matePost.addUsers(nickName);
    res.send('가입성공.');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/outcrew', async (req, res, next) => {
  const { nickName, id } = req.body;

  try {
    const matePost = await MatePost.findOne({ where: { id } });
    if (!matePost) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await matePost.removeUsers(nickName);
    res.send('탈퇴성공.');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
