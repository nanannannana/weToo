import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const WeatherCases = {
  Rain: {
    title: 'Raining',
    subtitle: '필라테스하기 좋은 날이에요.',
    icon: 'ios-rainy',
  },
  Clear: {
    title: 'Sunny',
    subtitle: '러닝하기 좋은 날이에요.',
    icon: 'ios-sunny',
  },
  Thunderstorm: {
    title: 'Thunderstrom',
    subtitle: '천둥이 쳐요. 헬스장에 가볼까요?',
    icon: 'ios-thunderstorm',
  },
  Clouds: {
    title: 'Clouds',
    subtitle: '흐리지만 테니스를 쳐볼까요?.',
    icon: 'ios-cloudy',
  },
  Snow: {
    title: 'Snow',
    subtitle: '스키나 보드를 타기 좋은 날이에요.',
    icon: 'ios-snow',
  },
  Drizzle: {
    title: 'Drizzle',
    subtitle: '요가하기 좋은 날이에요.',
    icon: 'ios-rainy-outline',
  },
  Haze: {
    title: 'Haze',
    subtitle: '요가하기 좋은 날이에요.',
    icon: 'ios-rainy-outline',
  },
  Mist: {
    title: 'Mist',
    subtitle: '습하니 수영장에 가볼까요?.',
    icon: 'ios-rainy-outline',
  },
};

const Title = styled.div`
  position: relative;
  height: 31.86px;
  top: 10px;
  font-family: 'Port Lligat Slab';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 26px;
  `;

const WeatherBox = styled.div`
  display: inline-block;
  position: relative;
  width: 55%;
  padding-bottom: 10%;
  top: 10px;
  border: 1px solid #D8D8D8;
  margin-bottom: 10%;

  font-family: 'Poppins';
  font-weight: 700;
`;

const City = styled.p`
  margin-top: 10%;
  margin-bottom: 0%;
`;
const State = styled.img`
  width: 60px;
`;

export default function Weather() {
  const [result, setResult] = useState({});
  const [weather, setWeather] = useState();
  const [icon, setIcon] = useState();

  const API_KEY = '4281729cba61323b40e791c6036334ed';
  // ab9fd86fdb0d2bd4968a55bfa83cf03c
  // c8fffee56b961e5df0d6af641bd1a6e3
  // 242b309a31182dc5c37381b6642b796c

  // const weatherRendering = () => {
  const iconurl = `http://openweathermap.org/img/w/${icon}.png`;
  const Region = 'bangkok';
  // }

  useEffect(() => {
    const weatherShow = async () => {
      const data = await axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${Region}&appid=${API_KEY}`,
      });
      setResult(data);
      setWeather(data.data.weather[0].main);
      setIcon(data.data.weather[0].icon);
    };
    weatherShow();
  }, []);

  return <>
    <Title>Today Weather</Title>
    <WeatherBox>
    {Object.keys(result).length !== 0 && (
          <div>
            <City>{Region}</City>
            <br />
            <State src={iconurl} alt='날씨' />
            <div className='temperature'>
              현재 기온 {Math.round((result.data.main.temp - 273.15) * 10) / 10}℃
            </div>
            <div className='sky'>{WeatherCases[weather].title}</div>
            <br />
            <div className='sky'>{WeatherCases[weather].subtitle}</div>
          </div>
    )}
    </WeatherBox>
  </>;
}
