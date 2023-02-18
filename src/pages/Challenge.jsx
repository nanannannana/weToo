import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import NavBar from '../components/mypage/NavBar';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ChModal from '../components/challenge/ChModal';
import { infoshow, modal } from '../store/modules/challenge';
import Info from '../components/challenge/Info';

const Title = styled.div``;
const SubTitle = styled.div`
  font-size: 10px;
`;
const LeftBox = styled.div`
  position: absolute;
  top: 110px;
  left: 7%;
  width: 44%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChallengeDiv = styled.div`
  border: 1px solid #d9d9d9;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
const ChallengeDivTitle = styled.p`
  margin-bottom: 0px !important;
`;

const AttendBtn = styled(Button)`
  margin-right: 7px;
  /* border: 1px solid #bb9595;
  background-color: #bb9595;
  &:hover,
  &:active {
    background-color: #9d5c5c !important;
    border: 1px solid #9d5c5c !important;
  } */
`;
const ProofBtn = styled(Button)`
  /* border: 1px solid #bb9595;
  background-color: #bb9595;
  &:hover,
  &:active {
    background-color: #9d5c5c !important;
    border: 1px solid #9d5c5c !important;
  } */
`;

const ExIcon = styled.img`
  position: absolute;
  top: 200px;
  right: 11%;
  width: 25%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Challenge() {
  // challenge 게시물 정보 가져오기
  const challenge = useSelector((state) => state.challenge.challenge);
  // 임시
  const user_id = 'hello12';
  const dispatch = useDispatch();
  // modal & info 화면에 보여짐 有/無
  const show = useSelector((state) => state.challenge.modal);
  const infoShow = useSelector((state) => state.challenge.infoShow);
  const [infoTitle, setInfoTitle] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    // portOne 실행을 위한 설정
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const portOne = document.createElement('script');
    portOne.src = 'https://service.iamport.kr/js/iamport.payment-1.2.0.js';
    document.head.appendChild(jquery);
    document.head.appendChild(portOne);

    dispatch(modal(false));
    dispatch(infoshow(false));

    //user_id가 있으면 '참여하기'버튼 active
    if (user_id !== '') setBtnDisabled(false);
  }, []);

  const AttendClick = (v) => {
    const IMP = window.IMP; // 생략 가능
    IMP.init(`${process.env.REACT_APP_IMP}`);
    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: new Date().getTime(),
        name: v.name,
        amount: 200,
        buyer_email: '',
        buyer_name: `${user_id}`,
        buyer_tel: v.buyer_tel,
      },
      function (rsp) {
        if (rsp.success) {
          console.log(rsp);
          const data = {
            user_id: rsp.buyer_name,
            user_phone: rsp.buyer_tel.replace(/-/g, ''),
            challenge_name: rsp.name,
            amount: rsp.paid_amount,
          };
          axios
            .post('http://localhost:8000/challenge/putData', data)
            .then(() => dispatch(modal(true)));
        } else {
          console.log(rsp);
        }
      }
    );
  };

  const ProofClick = (v) => {
    dispatch(infoshow(true));
    setInfoTitle(v);
  };

  return (
    <>
      {show && <ChModal />}
      {/* <Header /> */}
      <NavBar />
      <LeftBox>
        <Title>
          Challenge
          <br />
          <SubTitle>Challenge에 참여하면 1000원이 기부됩니다.</SubTitle>
        </Title>
        {challenge.map((v, i) => (
          <ChallengeDiv key={i}>
            <ChallengeDivTitle>{v.name}</ChallengeDivTitle>
            <div>
              <AttendBtn
                disabled={btnDisabled}
                variant="dark"
                onClick={() => AttendClick(v)}
              >
                참여하기
              </AttendBtn>
              <ProofBtn variant="dark" onClick={() => ProofClick(v.name)}>
                인증하기
              </ProofBtn>
            </div>
          </ChallengeDiv>
        ))}
      </LeftBox>
      {infoShow && <Info title={infoTitle} user_id={user_id} />}
      {!infoShow && <ExIcon src="/img/exercise_icon.png" />}
    </>
  );
}
