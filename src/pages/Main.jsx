import React from 'react';
import Header from '../components/common/Header.jsx';
import Weather from '../components/main/Weather.jsx';
import Fitness from '../components/main/Fitness.jsx';
import styled from 'styled-components';

const Div = styled.div`
  position: absolute;
  width: 33%;
  height: 80%;
  right: 7%;
  top: 150px;
  text-align: center;
`;

export default function Main() {
  return <>
    <Header />
    <Div>
      <Weather />
    </Div>
  </>;
}
