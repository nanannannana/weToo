import React, { useState, useEffect } from 'react';
import './Info.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BodyShorthandExample(crews) {
  const navigate = useNavigate();

  const { title, location, members } = crews;
  const [show, setShow] = useState(false);
  const [result, setResult] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //추가해야 하는 부분
  const user = useSelector((state) => state.user.userInfo);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const infomodal = async () => {
      const userinfo = await axios({
        method: 'post',
        url: 'http://localhost:8000/mypage/info',
      });
      setResult(userinfo);
    };
    infomodal();

    // 추가 해야 하는 부분
    const axiosData = async () => {
      axios
        .post('http://localhost:8000/mypage/Donation', user)
        .then((res) => setAmount(res.data.reduce((a, c) => a + c.amount, 0)));
    };
    axiosData();
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
            <label>아이디</label>
            <br />
            <input type="text" className="id" value={sessionStorage.id} />
            <br />
            <label>비밀번호</label>
            <br />
            <input
              type="password"
              className="password"
              value={sessionStorage.pw}
            />
            <br />
            <label>도시</label>
            <br />
            <input type="text" className="city" />
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
              <li>요가교실-현재 모금 금액 : {amount}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default BodyShorthandExample;
