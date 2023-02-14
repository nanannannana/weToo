import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  position: relative;
  height: 31.86px;
  
  font-family: 'Port Lligat Slab';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 26px;
  `;

const FitnessBox = styled.div`
display: inline-block;
position: relative;
width: 55%;
padding-bottom: 50%;
top: 10px;
background-color: #D8D8D8;
`;

export default function Weather() {
  // const API_KEY =
  // '4281729cba61323b40e791c6036334ed'
  // "ab9fd86fdb0d2bd4968a55bfa83cf03c"
  // "c8fffee56b961e5df0d6af641bd1a6e3"
  // "242b309a31182dc5c37381b6642b796c"
  // ;
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}`;
  // const [result, setResult] = useState({});
  // const [weather, setWeather] = useState();
  // const [icon, setIcon] = useState();

  // // const weatherRendering = () => {
  //   let iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
  // // }

  // useEffect(() => {

  // const weatherShow = async (Seoul) => {
  //   const data =
  //   await axios({
  //     method: "get",
  //     url: url,
  //   });
  //   setResult(data);
  //   setWeather(data.data.weather[0].main);
  //   setIcon(data.data.weather[0].icon);
  //   console.log(data.data.weather[0].main);
  //   console.log(data.data.weather[0].icon);
  // };
  // weatherShow();
  // }, []);

  return <>
    <Title>Today Fitness</Title>
    <FitnessBox>
    </FitnessBox>
  </>;
}
