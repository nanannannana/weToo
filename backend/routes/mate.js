const User = require('../models/User');
const express = require('express');
const router = express.Router();
const MatePost = require('../models/MatePost');

router.get('/', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await MatePost.findAll({
      where,
      limit: 10,
      // order: [
      //   ['id', 'DESC'],
      // ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
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

module.exports = router;
