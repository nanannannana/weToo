const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const Proof = require('../models/Proof');

router.post('/putData', (req, res) => {
  console.log('받은 데이터 확인', req.body);
  Challenge.create({
    user_id: req.body.user_id,
    user_phone: req.body.user_phone,
    challenge_name: req.body.challenge_name,
    amount: req.body.amount,
  });
  res.send(true);
});
router.post('/searchData', async (req, res) => {
  console.log('받은 데이터 확인: ', req.body);
  const result = await Proof.findAll({
    raw: true,
    where: { challenge_name: req.body.challenge_name },
    include: [
      {
        model: User,
        required: true,
        attributes: ['nickName'],
      },
    ],
    order: [['id', 'DESC']],
  });
  res.send(result);
});

module.exports = router;
