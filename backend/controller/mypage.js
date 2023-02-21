const Challenge = require('../models/Challenge');
const User = require('../models/User');

exports.My_info = async (req, res) => {
  console.log(req.body);
  const nickName = await User.findOne({
    where: { id: req.body.id },
    attributes: ['nickName', 'id', 'address', 'name'],
  });

  const info = nickName.dataValues;
  console.log(info);
  res.send(info);
};

exports.searchDonation = async (req, res) => {
  console.log(req.body.id);
  const result = await Challenge.findAll({
    raw: true,
    where: { user_id: req.body.id },
    attributes: ['amount'],
  });
  res.send(result);
}
