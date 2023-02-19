import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import { Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { goupload, infoshow, modal } from '../../store/modules/challenge';
import ChUpload from './ChUpload';
import { BiLeftArrowAlt, BiX } from 'react-icons/bi';

const InfoBox_mount = keyframes`
    from {
        opacity: 0;
        right: 0;
    }
    to {
        opacity: 1;
        right: 8%;
    }
`;
const InfoBox_unmount = keyframes`
    from {
        opacity: 1;
        right: 8%;
    }
    to {
        opacity: 0;
        right: 0;
    }
`;

const InfoBox = styled.div`
  animation: ${(props) =>
    props.animation
      ? css`
          ${InfoBox_mount} 1s ease-in-out
        `
      : css`
          ${InfoBox_unmount} 1s ease-in-out
        `};

  position: absolute;
  top: 150px;
  right: 8%;
  width: 40%;
  height: 70%;
  border-radius: 57px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 21px 21px 59px #d4d4d4, -21px -21px 59px #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ExitIcon = styled(BiLeftArrowAlt)`
  float: right;
  color: #797979 !important;
  margin-top: 7px;
`;

const Title = styled.div`
  padding: 20px 30px 5px 30px;
  border-bottom: 1px solid #999999;

  // 폰트 지정
  @font-face {
    font-family: 'ghanachoco';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ghanachoco.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'ghanachoco';
  font-size: 35px;
  background: linear-gradient(to right bottom, #000000, #d7d7d7);
  color: transparent;
  -webkit-background-clip: text;
`;

const Main = styled.div`
  padding: 10px 30px 0 30px;
  overflow: auto;
  height: inherit;
`;
const Donation = styled.div`
  margin-bottom: 10px;
`;
const ProofImg = styled.img`
  object-fit: cover;
  border: 1px solid #999999;
  width: 100%;
  height: 250px;
  margin-bottom: 30px;
`;

const Footer = styled.div`
  padding: 15px 40px 15px 0;
  border-top: 1px solid #999999;
`;
const JoinBtn = styled(Button)`
  float: right;
`;
const ProofBtn = styled(Button)`
  float: right;
  clear: both;
  margin-left: 7px;
`;
const FooterContent = styled.div`
  float: right;
  clear: both;
  margin-top: 5px;
`;

export default function Chinfo() {
  const dispatch = useDispatch();
  const [mountAni, setMountAni] = useState(true);
  // 임시 user_id
  const user_id = 'hello12';
  // challenge 정보 가져옴
  const infoObj = useSelector((state) => state.challenge.infoObj);
  const [joinBtnDisabled, setJoinBtnDisabled] = useState(true);
  const [proofBtnDisabled, setProofDisabled] = useState(true);
  const goUpload = useSelector((state) => state.challenge.goUpload);
  const [proofData, setProofData] = useState([]);

  useEffect(() => {
    // portOne 실행을 위한 설정
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const portOne = document.createElement('script');
    portOne.src = 'https://service.iamport.kr/js/iamport.payment-1.2.0.js';
    document.head.appendChild(jquery);
    document.head.appendChild(portOne);

    //user_id가 있으면 '참여하기'버튼 active
    if (user_id !== '') setJoinBtnDisabled(false);
  }, []);

  const axiosData = async () => {
    await axios
      .post('http://localhost:8000/challenge/searchData', {
        challenge_name: infoObj.name,
        user_id: user_id,
      })
      .then((res) => {
        setProofData(res.data.ProofData);
        // 사용자 기부 횟수 0 or 기부 횟수 = 인증 횟수인 경우, '인증남기기' 버튼 disabled
        // 아닐 경우, '인증남기기' 버튼 active
        res.data.myChallengeLength === 0
          ? setProofDisabled(true)
          : res.data.myChallengeLength === res.data.myProofLength
          ? setProofDisabled(true)
          : setProofDisabled(false);
      });
  };

  // unmount 효과
  const CloseInfo = () => setMountAni(false);
  useEffect(() => {
    if (!mountAni) {
      setTimeout(() => dispatch(infoshow(false)), 900);
    }
  }, [mountAni]);

  // 인증 게시물 가져옴
  useEffect(() => {
    axiosData();
    dispatch(goupload(false));
  }, [infoObj]);

  // 인증 게시물 올린 뒤 리렌더링 -> 올린 게시글 새로고침 없이 확인하기 위해
  useEffect(() => {
    axiosData();
  }, [goUpload]);

  // '인증남기기' 버튼 클릭 시, 사진 업로드 컴포넌트로 전환
  const GoUpload = () => dispatch(goupload(true));

  // '참여하기' 버큰 클릭 시, 결제 진행
  const JoinClick = () => {
    const IMP = window.IMP; // 생략 가능
    IMP.init(`${process.env.REACT_APP_IMP}`);
    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: new Date().getTime(),
        name: infoObj.name,
        amount: 200,
        buyer_email: '',
        buyer_name: `${user_id}`,
        buyer_tel: infoObj.buyer_tel,
      },
      function (rsp) {
        if (rsp.success) {
          // 기부 결제 완료 시, user 정보 서버로 전송
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

  // 인증샷 삭제
  const deleteImg = (v) => {
    axios
      .delete('http://localhost:8000/challenge/deleteData', {
        data: { img: v.img, challenge_name: v.challenge_name },
      })
      .then((res) => {
        alert('삭제완료');
        setProofData(res.data);
      });
  };

  return (
    <InfoBox animation={mountAni}>
      <Title>
        {infoObj.name} <ExitIcon onClick={CloseInfo} />
      </Title>
      <Main>
        {goUpload ? (
          <ChUpload />
        ) : (
          <>
            <Donation>
              {proofData.length === 0
                ? '누적 기부금: 0원'
                : `누적 기부금: ${proofData.length}000원`}
            </Donation>
            <Row>
              {proofData.slice(0, 6).map((v, i) => (
                <React.Fragment key={i}>
                  <Col xs={6}>
                    {user_id === process.env.REACT_APP_ADMIN_ID ? (
                      <BiX size="20" onClick={() => deleteImg(v)} />
                    ) : (
                      true
                    )}
                    <ProofImg src={v.img} />
                  </Col>
                </React.Fragment>
              ))}
            </Row>
          </>
        )}
      </Main>
      <Footer>
        <ProofBtn variant="dark" disabled={proofBtnDisabled} onClick={GoUpload}>
          인증남기기
        </ProofBtn>
        <JoinBtn variant="dark" onClick={JoinClick} disabled={joinBtnDisabled}>
          참여하기
        </JoinBtn>
        <FooterContent>인증글을 남기면 기부금이 증가해요!</FooterContent>
      </Footer>
    </InfoBox>
  );
}
