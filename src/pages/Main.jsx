import React from 'react';
import Weather from '../components/main/Weather.jsx';
import styled from 'styled-components';
import NavBar from '../components/mypage/NavBar.jsx'

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
  width: 100%;
  height: 50%;
  font-size:2vw;
  `;

const ChBox = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  top: 50%;
  font-size: 2vw;
`;

export default function Main() {
  return <>
    <NavBar />
    <Fdiv>
      <Ldiv>
        <CrBox>
          Crew
        </CrBox>
        <ChBox>
          Challenge
        </ChBox>
      </Ldiv>
        <Div>
          <Weather />
        </Div>
    </Fdiv>
  </>;
}
