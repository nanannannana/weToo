// const axios = require('axios');
const User = require('../models/User');
// const userInfo = User.findOne({
//   where: { id }
//   // attributes: ['nickName', 'id', 'pw'],
// });

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
