import React from 'react';
import Header from '../components/common/Header.jsx';
import Weather from '../components/main/Weather.jsx';
import Fitness from '../components/main/Fitness.jsx';
import styled from 'styled-components';
import NavBar from '../components/mypage/NavBar.jsx'
import Challenge from './Challenge.jsx';
import CrewBox from '../components/crew/CrewBox.jsx';
const Div = styled.div`
  position: absolute;
  width: 33%;
  height: 70%;
  right: 7%;
  top: 150px;
  bottom: 10px;
  text-align: center;
  background-color: #FAF9F9;
`;

const Ldiv = styled.div`
  position: absolute;
  width: 50%;
  height: 70%;
  left: 7%;
  top: 150px;
  bottom: 10px;
  text-align: center;
  background-color: #FAF9F9;
  align-items: center;
  display
`;

const CText = styled.span`
  position: absolute;
  left: 55px;
  font-size: 24px;
`;

const CrBox = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  top: 1px;
  display: grid;
  /* background-color: gray; */
  &:first-child {
    right: 55px;
  }
`;

const ChBox = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 1px;
  text-align: left;
  font-size: 24px;
`;

export default function Main() {
  return <>
    <NavBar />
  <Ldiv>
    <CrBox>
      <CText>
      Crew
      </CText>
      <br />
      <CrewBox />
    </CrBox>
    <ChBox>
      Challenge
    </ChBox>
  </Ldiv>
    <Div>
      <Weather />
    </Div>
  </>;
}
