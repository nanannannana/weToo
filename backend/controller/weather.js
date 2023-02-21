const axios = require('axios');
const User = require('../models/User');
// const userInfo = User.findOne({
//   where: { id }
//   // attributes: ['nickName', 'id', 'pw'],
// });


exports.today_weather = async(req, res) => {
  let address;
  let def;
  if (req.body.id !== '') {
    def = '';
    address = await User.findOne({
      where: { id: req.body.id },
      attributes: ['address'],
    });
  } else {
    def = 'seoul';
  }
  const Region = def === '' ? address.dataValues.address : def;
  const API_KEY = '4281729cba61323b40e791c6036334ed';
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${Region}&appid=${API_KEY}`;
  
  axios({
    url: url,
    method: 'GET',
    responseType: 'JSON'
  }).then((result) => {
    // console.log("결과 ", result.data);
    res.send(result.data);
  });
  };