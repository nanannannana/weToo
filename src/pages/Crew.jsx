import React from 'react';
import Header from '../components/common/Header.jsx';
import Inform from '../components/crew/Inform.jsx';
import styled, { css } from 'styled-components';
import Button from '../components/common/Button.jsx';
import CrewBox from '../components/crew/CrewBox.jsx';

let Div = styled.div`
  position: absolute;
  width: 28%;
  height: 80%;
  right: 7%;
  top: 150px;
  text-align: center;
  background-color: #eaeaea;
`;
const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 13rem;
  border: 1px black;
  padding: 1rem;
`;

const BoxDiv = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 13rem;
  border: 1px black;
  padding: 1rem;
`;

export default function Crew() {
  return (
    <div>
      <Header />
      <AppBlock>
        <Button>CREW +</Button>
      </AppBlock>
      <BoxDiv>
        <CrewBox />
      </BoxDiv>
      <Div>
        <Inform />
      </Div>
    </div>
  );
}
