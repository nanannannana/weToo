const User = require('../models/User');
const express = require('express');
const router = express.Router();
const MatePost = require('../models/MatePost');
const db = require('../models');
router.get('/', async (req, res, next) => {
  console.log(req.query);
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
          attributes: ['nickName'],
        },
      ],
    });
    console.log(posts);

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/addcrew', async (req, res, next) => {
  console.log(req.body);
});

module.exports = router;
