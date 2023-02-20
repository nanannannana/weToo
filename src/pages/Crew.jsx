import React, { useEffect, useState } from 'react';
import CrewBox from '../components/crew/CrewBox.jsx';
import NavBar from '../components/mypage/NavBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../store/modules/crew';
import axios from 'axios';

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
  const CrewTitle = styled.input`
    width: 60%;
    height: 3%;
    padding: 10px;
    margin: 5px 30px;
    border: 1px solid #d8d8d8;
    ::placeholder {
      font-size: 3px;
    }
  `;
  const ImgInput = styled.input`
    width: 65%;
    height: 3%;
    padding: 10px;
    margin: 3px 93px;
    border: 1px solid #d8d8d8;
  `;
  const CrewInfo = styled.input`
    width: 75%;
    height: 3%;
    padding: 10px;
    margin: 5px 15px;
    border: 1px solid #d8d8d8;
    ::placeholder {
      font-size: 3px;
  `;
  // let [input, setInput] = useState('');
  // function addCrew(input) {
  //   let newCrew = [...crew];
  //   newCrew.unshift(input);
  //   setInput(newCrew);
  // }
  const dispatch = useDispatch();
  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [crewInfo, setCrewInfo] = useState('');
  const registerImg = (e) => {
    setImg(e.target.files[0]);
  };
  const addCrew = () => {};

  const registerTitle = (e) => {
    setTitle(e.target.value);
  };
  const registerCrewInfo = (e) => {
    setCrewInfo(e.target.value);
  };

  // useEffect(() => {
  //   dispatch(upload(false));
  // }, []);

  // const addCrew = async () => {
  //   const request = await axios({
  //     method: 'post',
  //     url: '',
  //     data: {
  //       title: title,
  //       crewInfo: crewInfo,
  //     },
  //   });

  //   dispatch(request.data);
  //   alert('크루생성 성공');
  // };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>크루 개설하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          이미지:
          <ImgInput
            type="file"
            accept="image/jpg, image/jepg, imag/png"
            //value={img}
            onChange={registerImg}
          />
          <br />
          크루 명 :
          <CrewTitle
            placeholder="Crew명"
            value={title}
            onChange={registerTitle}
            required
          />
          <br />
          소개 문구 :
          <CrewInfo
            placeholder="Crew 소개 문구"
            value={crewInfo}
            onChange={registerCrewInfo}
            required
          />
        </Modal.Body>

        <Modal.Footer className="modal_footer">
          {/* <br />
          <Button variant="light" onClick={() => addCrew()}> */}
          <Button variant="light" onClick={addCrew}>
            크루 개설하기
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
