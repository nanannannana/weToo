import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import CrewBox from '../components/crew/CrewBox.jsx';
import NavBar from '../components/mypage/NavBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>크루 생성하기</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button variant="light" onClick={handleClose}>
            생성하기
          </Button>
        </Modal.Footer>
      </Modal>
      <NavBar />
      <AppBlock>
        <Button variant="light" onClick={handleShow} className="crew">
          +CREW
        </Button>
      </AppBlock>
      <BoxDiv>
        <CrewBox />
      </BoxDiv>
    </div>
  );
}
