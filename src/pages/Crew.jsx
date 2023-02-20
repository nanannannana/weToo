import React, { useState } from 'react';
import CrewBox from '../components/crew/CrewBox.jsx';
import NavBar from '../components/mypage/NavBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import ChatBox from '../components/crew/ChatBox.jsx';

export default function Crew() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Div = styled.div`
    position: absolute;
    width: 33%;
    right: 7%;
    top: 150px;
    text-align: center;
  `;
  const DivCrewBox = styled.div`
    position: relative;
    margin 0 70px;
    top: 20%;
    display: flex;
  `;

  const DivChatBox = styled.div`
    position: absolute;
    left: 70%;
    top: 30%;
    text-align: center;
  `;

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
      <Div>
        <Button variant="light" onClick={handleShow}>
          +CREW
        </Button>
      </Div>
      <DivCrewBox>
        <CrewBox />
      </DivCrewBox>

      {/* <DivChatBox>
        <ChatBox />
      </DivChatBox> */}
    </div>
  );
}
