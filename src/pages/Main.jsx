import React, { useState } from 'react';
import Weather from '../components/main/Weather.jsx';
import styled, { keyframes } from 'styled-components';
import NavBar from '../components/mypage/NavBar.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Fdiv = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 90%;
  max-width: 1930px;
  height: 85%;
`;
const Div = styled.div`
  position: absolute;
  width: 30%;
  height: 90%;
  right: 1%;
  top: 50%;
  transform: translate(0%, -50%);
  text-align: center;
  background-color: #FAF9F9;
`;
const Ldiv = styled.div`
  position: absolute;
  width: 65%;
  height: 90%;
  left: 1%;
  top: 50%;
  transform: translate(0%, -50%);
  background-color: #FAF9F9;
  `;

// const CText = styled.span`
//   position: absolute;
//   font-size: 2vw;
//   background-color: yellow;
// `;

const CrBox = styled.div`
  position: absolute;
  padding-left : 10%;
  width: 100%;
  height: 50%;
  font-size:2vw;
  `;

const ChBox = styled.div`
  position: relative;
  padding-left : 10%;
  width: 100%;
  height: 50%;
  top: 50%;
  font-size: 2vw;
`;
// -------------------------------------------------------------
const ChallengeItems = styled.div`
  // 위치 지정
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  width: 70%;

  // 폰트 지정
  @font-face {
    font-family: 'ONE-Mobile-Title';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-Title.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'ONE-Mobile-Title';
  font-size: 1.7vw;
  @media (max-width: 1919px) {
    font-size: 1.3vw;
  }
  @media (max-width: 1441px) {
    font-size: 1.7vw;
    margin-bottom: 30px;
  }
  @media (max-width: 1200px) {
    font-size: 2vw;
  }
  @media (max-width: 769px) {
    font-size: 3vw;
    margin-bottom: 25px;
  }
  @media (max-width: 426px) {
    font-size: 2vw;
  }
  @media (max-width: 321px) {
    font-size: 1.7vw;
  }
`;
const ChallengeItem = styled.div`
  &:hover {
    color: #505050;
  }
`;
    
const un_mount_icon = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
const GoInfoIcon = styled.p`
font-size: 1vw;
font-family: initial;
right:10%;
animation: ${un_mount_icon} 0.3s ease-in-out;
`;

export default function Main({arrowShow}) {
  const [isHover, setIsHover] = useState(null);
  const MouseOver = (i) => {
    infoShow && arrowShow ? setIsHover(null) : setIsHover(i);
  };

  const infoShow = useSelector((state) => state.challenge.infoShow);
  const challenge = useSelector((state) => state.challenge.challenge);
  return <>
    <NavBar />
    <Fdiv>
      <Ldiv>
        <CrBox>
          Crew
        </CrBox>
        <ChBox>
          OPEN Challenge
          <br />
          <br />
          {challenge.slice(0,3).map((v, i) => (
        <React.Fragment key={i}><Link as={Link} to="/challenge" style={{ textDecoration: "none" , color:"black" }}>
          <ChallengeItems
            onMouseOver={() => MouseOver(i)}
            onMouseOut={() => setIsHover(null)}
          >
            <ChallengeItem>{v.name}</ChallengeItem>
            {isHover === i && <GoInfoIcon>-----challenge 더보기</ GoInfoIcon>}
          </ChallengeItems></Link>
        </React.Fragment>
      ))}
        </ChBox>
      </Ldiv>
        <Div>
          <Weather />
        </Div>
    </Fdiv>
  </>;
}
