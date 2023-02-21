import React, { useState, useEffect } from 'react';
import './Info.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BodyShorthandExample(crews) {
  const navigate = useNavigate();

  const { title, location, members } = crews;
  const [show, setShow] = useState(false);
  const [result, setResult] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const infomodal = async () => {
      console.log(sessionStorage.id);
      const userinfo = await axios({
        method: 'post',
        url: 'http://localhost:8000/mypage/info',
        data: {
          id: sessionStorage.id,
        },
      });
      setResult(userinfo.data);
      console.log(userinfo.data);
    };
    infomodal();
  }, []);

  const deleteInfo = () => {
    sessionStorage.clear();
    alert('탈퇴완료!');
    navigate('/');
  };

  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>회원정보 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>닉네임</label>
            <br />
            <input type="text" className="nickname" value={result.nickName} />
            <br />
            <label>이름</label>
            <input type="text" className="id" value={sessionStorage.id}/>
            <br />
            <input type="text" className="name" value={result.name} />
            <br />
            <label>아이디</label>
            <br />
            <input type="text" className="id" value={result.id} />
            <input type="password" className="password" value={sessionStorage.pw}/>
            <br />
            <label>도시</label>
            <br />
            <input type="text" className="city" value={result.address} />
          </Modal.Body>
          <Modal.Footer className="modal_footer">
            <Button variant="light" onClick={handleClose}>
              수정하기
            </Button>
            <Button variant="light" onClick={() => deleteInfo()}>
              탈퇴하기
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <div className="container">
        <div className="my_info_container">
          나의 정보
          <div className="my_info">
            <div className="info_pic">
              <ul>
                <li>이름 : {result.name}</li>
                <li>닉네임 : {result.nickName}</li>
                <li>아이디 : {result.id}</li>
                <li>지역 : {result.address}</li>
              </ul>
            </div>
          </div>
          <Button variant="light" onClick={handleShow} className="edit_profile">
            정보 수정
          </Button>
        </div>

        <div className="crew_container">
          CREW
          <div className="crew_card">
            <ul>
              <li>{title}</li>
              <li>{location}</li>
              <li>{members}</li>
            </ul>
          </div>
        </div>

        <div className="challenge_container">
          참여중인 챌린지
          <div className="challenge_card">
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default BodyShorthandExample;
