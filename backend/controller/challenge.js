const Challenge = require('../models/Challenge');
const User = require('../models/User');
const Proof = require('../models/Proof');

exports.putData = (req, res) => {
  console.log('받은 데이터 확인', req.body);
  Challenge.create({
    user_id: req.body.user_id,
    user_phone: req.body.user_phone,
    challenge_name: req.body.challenge_name,
    amount: req.body.amount,
  });
  res.send(true);
};

exports.searchData = async (req, res) => {
  console.log('받은 데이터 확인: ', req.body);
  const challengeData = await Challenge.findAll({
    raw: true,
    where: {
      challenge_name: req.body.challenge_name,
      user_id: req.body.user_id,
    },
  });
  const ProofData = await Proof.findAll({
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
  console.log(challengeData);
  res.send({ challengeLength: challengeData.length, ProofData: ProofData });
};

exports.proofUpload = async (req, res) => {
  await Proof.create({
    challenge_name: req.body.challenge_name,
    user_id: req.body.user_id,
    content: req.body.content,
  });
  res.send(true);
};
