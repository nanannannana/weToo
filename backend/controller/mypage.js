const Challenge = require('../models/Challenge');

exports.Info = async (req, res) => {
  console.log(req.body);
};

exports.searchDonation = async (req, res) => {
  console.log(req.body.id);
  const result = await Challenge.findAll({
    raw: true,
    where: { user_id: req.body.id },
    attributes: ['amount'],
  });
  res.send(result);
};
