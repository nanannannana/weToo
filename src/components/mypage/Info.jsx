import React, { useState, useEffect } from 'react';
import './Info.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BodyShorthandExample(crews) {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [result, setResult] = useState({});
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [id, setId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //추가해야 하는 부분
  const user = useSelector((state) => state.user.userInfo);
  const [amount, setAmount] = useState(0);

  const nickNameHandler = (e) => {
    setNickname(e.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const idHandler = (e) => {
    setId(e.target.value);
  };

  const cityHandler = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    // 프론트 <-> 서버 연결 에러 수정
    const infomodal = async () => {
      console.log(sessionStorage.id);
      const userinfo = await axios({
        method: 'post',
        url: 'http://localhost:8000/mypage/info',
        data: {
          id: sessionStorage.id,
        },
      });
      // info: 유저 정보, amount: 기부금 총 합
      setResult(userinfo.data.info);
      setAmount(userinfo.data.amount);
      console.log(userinfo.data);
    };

    // 비로그인 시, alert 창 띄운 후 -> login페이지로
    if (sessionStorage.id === undefined) {
      alert('로그인을 하세요.');
      navigate('/login');
    } else {
      infomodal();
    }
  }, []);

  const deleteInfo = async () => {
    const delData = await axios({
      method: 'delete',
      url: 'http://localhost:8000/auth/delInfo',
      data: {
        id: sessionStorage.id,
        pw: sessionStorage.pw,
        address: city,
        name: name,
        nickName: nickname,
      },
    });
    sessionStorage.clear();
    alert('탈퇴완료');
    navigate('/');
    // sessionStorage.clear();
    // alert('탈퇴완료!');
    // navigate('/');
  };

  const updateInfo = async () => {
    const data = await axios({
      method: 'put',
      url: 'http://localhost:8000/auth/updateInfo',
      data: {
        id: sessionStorage.id,
        address: city,
        name: name,
        nickName: nickname,
      },
    });
    alert('회원정보 수정');
    handleClose();
    window.location.reload();
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
            <input
              type="text"
              className="id"
              value={result.id}
              onChange={idHandler}
            />
            <br />
            <label>닉네임</label>
            <br />
            <input
              type="text"
              className="nickname"
              value={nickname}
              onChange={nickNameHandler}
            />
            <br />
            <label>이름</label>
            <br />
            <input
              type="text"
              className="name"
              value={name}
              onChange={nameHandler}
            />
            <br />
            <label>도시</label>
            <br />
            <input
              type="text"
              className="city"
              value={city}
              onChange={cityHandler}
            />
          </Modal.Body>
          <Modal.Footer className="modal_footer">
            <Button variant="light" onClick={updateInfo}>
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
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>

        <div className="challenge_container">
          참여중인 챌린지
          <div className="challenge_card">
            <ul>
              <li>현재 모금 금액 : {amount}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default BodyShorthandExample;
