import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import CrewBox from '../components/crew/CrewBox.jsx';
import NavBar from '../components/mypage/NavBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

      <Button variant="light" onClick={handleShow} className="crew">
        +CREW
      </Button>
      <CrewBox />
    </div>
  );
}
