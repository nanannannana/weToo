import React, { useState } from 'react';
import './Info.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BodyShorthandExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>회원정보 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>아이디</label>
            <br />
            <input type="text" className="id" />
            <br />
            <label>비밀번호</label>
            <br />
            <input type="password" className="password" />
          </Modal.Body>
          <Modal.Footer className="modal_footer">
            <Button variant="light" onClick={handleClose}>
              수정하기
            </Button>
            <Button variant="light">탈퇴하기</Button>
          </Modal.Footer>
        </Modal>
      </>

      <div className="container">
        <div className="my_info_container">
          <div className="my_info">
            <div className="info_pic"></div>
          </div>
          <Button variant="light" onClick={handleShow} className="edit_profile">
            정보 수정
          </Button>
        </div>

        <div className="crew_container">
          CREW
          <div className="crew_card">
            <ul>
              <li>서울걷기</li>
              <li>서울시 용산구</li>
              <li>멤버수 : 4명</li>
            </ul>
          </div>
        </div>

        <div className="challenge_container">
          참여중인 챌린지
          <div className="challenge_card">
            <ul>
              <li>요가교실</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default BodyShorthandExample;
