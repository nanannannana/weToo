import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { infoshow } from '../../store/modules/challenge';
import axios from 'axios';

const RightBox = styled.div`
  position: absolute;
  top: 120px;
  right: 13%;
  width: 30%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ExitIcon = styled(BsArrowLeft)`
  float: right;
`;
const InfoDiv = styled.div`
  height: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const InfoHeader = styled.div`
  border: 1px solid #d9d9d9;
  padding: 7px 5px;
`;
const InfoMain = styled.div`
  border: 1px solid #d9d9d9;
  background-color: #faf9f9;
  height: 100%;
  padding: 7px 7px;
  /* display: flex;
  justify-content: space-between;
  flex-direction: column; */
`;
const InfoMainTitle = styled.div`
  font-size: 10px;
`;
const InfoMainItem = styled.div`
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
  height: 16%;
  width: 100%;
  padding: 6px 5px;
  margin-top: 6px;
`;
const Nickname = styled.div`
  font-size: 5px;
  float: right;
`;
const Content = styled.div`
  font-size: 15px;
`;
const InfoFooter = styled.div`
  border: 1px solid #d9d9d9;
  padding: 7px 5px;
`;
const MissionBtn = styled(Button)`
  float: right;
  /* border: 1px solid #bb9595;
  background-color: #bb9595;
  &:hover,
  &:active {
    background-color: #9d5c5c !important;
    border: 1px solid #9d5c5c !important;
  } */
`;
const FooterContent = styled.p`
  clear: both;
  float: right;
  font-size: 10px;
  margin-bottom: 0px !important;
`;

export default function Info({ title, user_id }) {
  const dispatch = useDispatch();
  // 챌린지 인증글
  const [infoData, setInfoData] = useState([]);
  const infoDataCut = infoData.slice(0, 5);
  // '인증남기기'버튼 기본 세팅 = disabled;
  const [btnDisabled, setBtnDisabled] = useState(true);
  // 인증글 value 저장
  const proofInputRef = useRef(null);
  const [change, setChange] = useState(true);

  useEffect(() => {
    const axiosData = async () => {
      await axios
        .post('http://localhost:8000/challenge/searchData', {
          challenge_name: title,
          user_id: user_id,
        })
        .then((res) => {
          console.log(res.data);
          setInfoData(res.data.ProofData);
          // 사용자 기부 횟수 0 or 기부 횟수 = 인증 횟수인 경우, '인증남기기' 버튼 disabled
          // 아닐 경우, '인증남기기' 버튼 active
          res.data.challengeLength === 0
            ? setBtnDisabled(true)
            : res.data.challengeLength === res.data.ProofData.length
            ? setBtnDisabled(true)
            : setBtnDisabled(false);
        });
    };
    axiosData();
  }, [title, change]);

  const CloseInfo = () => dispatch(infoshow(false));
  const proofUpload = () => {
    const data = {
      challenge_name: title,
      user_id: user_id,
      content: proofInputRef.current.value,
    };
    axios.post('http://localhost:8000/challenge/proofUpload', data).then(() => {
      setChange(!change);
      proofInputRef.current.value = '';
    });
  };

  return (
    <>
      <RightBox>
        <div>
          Info <ExitIcon onClick={CloseInfo} />
        </div>
        <InfoDiv>
          <InfoHeader>{title}</InfoHeader>
          <InfoMain>
            <InfoMainTitle>
              {infoData.length === 0
                ? '누적 기부금: 0원'
                : `누적 기부금: ${infoData.length}000원`}
            </InfoMainTitle>
            {infoData.length !== 0 &&
              infoDataCut.map((v, i) => (
                <InfoMainItem key={i}>
                  <Nickname>{v['User.nickName']}</Nickname>
                  <Content>{v.content}</Content>
                </InfoMainItem>
              ))}
          </InfoMain>
          <InfoFooter>
            <InputGroup className="mb-1">
              <Form.Control
                ref={proofInputRef}
                placeholder="인증글을 작성해주세요!"
              />
              <Button
                disabled={btnDisabled}
                variant="outline-success"
                onClick={proofUpload}
              >
                인증남기기
              </Button>
            </InputGroup>
            <FooterContent>인증글을 남기면 기부금이 증가해요!</FooterContent>
          </InfoFooter>
        </InfoDiv>
      </RightBox>
    </>
  );
}
