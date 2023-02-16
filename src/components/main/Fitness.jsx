import React from 'react';
import styled from 'styled-components';

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

const FitnessBox = styled.img`
display: inline-block;
position: relative;
width: 55%;
padding-bottom: 50%;
top: 10px;
background-color: #D8D8D8;
`;

export default function Weather(props) {
  console.log(props.src);
  return <>
    <Title>Today Fitness</Title>
    <FitnessBox>
    </FitnessBox>
  </>;
}
