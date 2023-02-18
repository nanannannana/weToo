import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { infoshow } from '../../store/modules/challenge';
import axios from 'axios';

const RightBox = styled.div`
  position: absolute;
  top: 120px;
  right: 12%;
  width: 33%;
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
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const InfoMainTitle = styled.div`
  font-size: 10px;
`;
const InfoMainItem = styled.div`
  border: 1px solid #dfc0c0;
  background-color: #ffffff;
  height: 17%;
  width: 100%;
  padding: 6px 5px;
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
  border: 1px solid #bb9595;
  background-color: #bb9595;
  &:hover,
  &:active {
    background-color: #9d5c5c !important;
    border: 1px solid #9d5c5c !important;
  }
`;
const FooterContent = styled.p`
  clear: both;
  float: right;
  font-size: 10px;
  margin-bottom: 0px !important;
`;

export default function Info({ title }) {
  const dispatch = useDispatch();
  const [infoData, setInfoData] = useState([]);

  useEffect(() => {
    axios
      .post('http://localhost:8000/challenge/searchData', {
        challenge_name: title,
      })
      .then((res) => setInfoData(res.data.slice(0, 5)));
  }, [title]);

  const CloseInfo = () => dispatch(infoshow(false));

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
              infoData.map((v, i) => (
                <InfoMainItem key={i}>
                  <Nickname>{v['User.nickName']}</Nickname>
                  <Content>{v.content}</Content>
                </InfoMainItem>
              ))}
          </InfoMain>
          <InfoFooter>
            <MissionBtn>인증남기기</MissionBtn>
            <FooterContent>인증글을 남기면 기부금이 증가해요!</FooterContent>
          </InfoFooter>
        </InfoDiv>
      </RightBox>
    </>
  );
}
