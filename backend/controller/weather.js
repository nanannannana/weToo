const axios = require('axios');

exports.today_weather = (req, res) => {
    const Region = 'seoul';
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