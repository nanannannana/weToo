import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  padding-bottom: 13%;
  top: 10px;
  border: 1px solid #D8D8D8;
  margin-bottom: 10%;

  font-family: 'Poppins';
  font-weight: 700;
`;

const City = styled.p`
  margin-top: 15%;
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
  const Region = 'Seoul';
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
      console.log(data);
    };
    weatherShow();
  }, []);

  return <>
    <Title>Today Weather</Title>
    <WeatherBox>
    {Object.keys(result).length !== 0 && (
          <div>
            <City>서울</City>
            <br />
            <State src={iconurl} alt="날씨" />
            <div className="temperature">
              현재 기온 {Math.round((result.data.main.temp - 273.15) * 10) / 10}℃
            </div>
            <div className="sky">
              {weather}
            </div>
          </div>
    )}
    </WeatherBox>
  </>;
}
