import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import yoga from '../../static/images/yoga.png';
import pilates from '../../static/images/pilates.png';
import running from '../../static/images/running.png';
import health from '../../static/images/health.png';
import tennis from '../../static/images/tennis.png';
import board from '../../static/images/board.png';
import swim from '../../static/images/swim.png';
import { useSelector } from 'react-redux';

const Outer = styled.div`
  align-content: center;
  display: block;
  position: relative;
  top: 45%;
  left: 50%;
  height: 90%;
  transform: translate(-50%, -50%);
  /* background-color: yellow; */
  @media (max-width: 912px) {
    height: unset;
    display: inline-block;
    width: 100%;
    align-content: initial;
    top: 3vh;
  }
`;
const Title = styled.span`
  margin: 1% 0 0 0;
  /* transform: translate(0%, 0%); */
  font-size: 2vw;
  font-family: 'Port Lligat Slab';
  font-style: normal;
  font-weight: 400;
  @media (max-width: 912px) {
    display: none;
  }
`;

const WeatherBox = styled.div`
  position: relative;
  text-align: center;
  margin: 0 10%;
  width: 80%;
  border: 1px solid #d8d8d8;
  background-color: #faf9f9;
  font-size: 1vw;
  font-family: 'Poppins';
  font-weight: 700;
  @media (max-width: 912px) {
    margin: unset;
    width: 50%;
    height: 28vh;
    position: absolute;
    font-size: 3vw;
  }
  @media (max-width: 426px) {
    height: 56vw;
    font-size: 4vw;
  }
`;

const State = styled.img`
  width: 8vh;
  height: 8vh;
`;
const FitnessBox = styled.div`
  position: relative;
  margin: 0 10% 0 10%;
  width: 80%;
  border: 1px solid #d8d8d8;
  background-color: #faf9f9;
  font-size: 1vw;
  font-family: 'Poppins';
  font-weight: 700;
  @media (max-width: 912px) {
    position: absolute;
    height: 28vh;
    width: 50%;
    left: 40%;
    top: 100%;
    font-size: 3vw;
  }
  @media (max-width: 426px) {
    height: 56vw;
    font-size: 4vw;
  }
`;
const Fitimg = styled.img`
  margin: 15%;
  width: 8vh;
  height: 8vh;
  @media (max-width: 912px) {
    margin-top: 20%;
  }
  @media (max-width: 426px) {
    margin-top: 30%;
  }
`;

const WeatherCases = {
  Rain: {
    title: 'Raining',
    subtitle: '필라테스하기',
    icon: 'ios-rainy',
    img: pilates,
  },
  Clear: {
    title: 'Sunny',
    subtitle: '러닝하기',
    icon: 'ios-sunny',
    img: running,
  },
  Thunderstorm: {
    title: 'Thunderstrom',
    subtitle: '헬스장가기',
    icon: 'ios-thunderstorm',
    img: health,
  },
  Clouds: {
    title: 'Clouds',
    subtitle: '테니스치기',
    icon: 'ios-cloudy',
    img: tennis,
  },
  Snow: {
    title: 'Snow',
    subtitle: '보드타기',
    icon: 'ios-snow',
    img: board,
  },
  Drizzle: {
    title: 'Drizzle',
    subtitle: '요가하기',
    icon: 'ios-rainy-outline',
    img: yoga,
  },
  Haze: {
    title: 'Haze',
    subtitle: '요가하기',
    icon: 'ios-rainy-outline',
    img: yoga,
  },
  Mist: {
    title: 'Mist',
    subtitle: '수영하기',
    icon: 'ios-rainy-outline',
    img: swim,
  },
};
export default function Weather() {
  const [result, setResult] = useState({});
  const [weather, setWeather] = useState();
  const [icon, setIcon] = useState();
  const [city, setCity] = useState(
    sessionStorage.city !== undefined
      ? sessionStorage.city.split('/')[0]
      : 'seoul'
  );

  // const API_KEY = '4281729cba61323b40e791c6036334ed';
  const iconurl = `http://openweathermap.org/img/w/${icon}.png`;
  // const Region = 'seoul';
  // ab9fd86fdb0d2bd4968a55bfa83cf03c
  // c8fffee56b961e5df0d6af641bd1a6e3
  // 242b309a31182dc5c37381b6642b796c
  // 4281729cba61323b40e791c6036334ed
  // const weatherRendering = () => {
  // }

  useEffect(() => {
    const weatherShow = async () => {
      const data = await axios({
        method: 'post',
        url: process.env.REACT_APP_URL + '/weather/today_weather',
        data: {
          city: city,
        },
        // id: sessionStorage.id,
        // url: `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${Region}&appid=${API_KEY}`,
      });
      setResult(data);
      console.log(data.data);
      setWeather(data.data.weather[0].main);
      setIcon(data.data.weather[0].icon);
    };
    weatherShow();
  }, []);
  return (
    <>
      <Outer>
        {Object.keys(result).length !== 0 && (
          <div>
            <Title>Weather</Title>
            <WeatherBox>
              <br />
              <p>
                우리 지역
                <br />
                날씨는?
              </p>
              <State src={iconurl} alt="날씨" />
              <div className="temperature">
                기온 {Math.round((result.data.main.temp - 273.15) * 10) / 10}℃
                <div className="sky">{WeatherCases[weather].title}</div>
                <br />
              </div>
            </WeatherBox>
            <Title>Today Fitness</Title>
            <FitnessBox>
              <br />
              <div className="sky">
                {WeatherCases[weather].subtitle}
                <br />
                좋은 날씨에요.
              </div>
              <Fitimg src={WeatherCases[weather].img} />
            </FitnessBox>
          </div>
        )}
      </Outer>
    </>
  );
}
