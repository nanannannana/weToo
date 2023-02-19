import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';
import { infochange, infoshow } from '../../store/modules/challenge';

const TitleBox = styled.div`
  margin-bottom: 20px;
`;
const Title = styled.div`
  &:first-child {
    font-size: 30px;
  }
  &:last-child {
    color: #4b4a4a;
  }
`;

const ChallengeDiv = styled.div`
  // 위치 지정
  position: absolute;
  padding: 0 8%;
  width: 100%;
  height: 75%;
  top: 150px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChallengeItems = styled.div`
  // 위치 지정
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;

  // 폰트 지정
  @font-face {
    font-family: 'ghanachoco';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ghanachoco.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'ghanachoco';
  font-size: 40px;
`;
const ChallengeItem = styled.div`
  &:hover {
    color: #505050;
  }
`;

const un_mount_icon = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const GoInfoIcon = styled(BsArrowRight)`
  animation: ${un_mount_icon} 0.3s ease-in-out;
`;

export default function ChChallenge() {
  const dispatch = useDispatch();
  // challenge 게시글 정보 가져옴
  const challenge = useSelector((state) => state.challenge.challenge);
  // challenge 제목 hover 시, 화살표 이모지 나타남
  const [isHover, setIsHover] = useState(null);
  const infoShow = useSelector((state) => state.challenge.infoShow);

  const clickChallenge = (v) => {
    // challenge 제목 click 시, info 컴포넌트 화면에 보임 & challengeInfo 값 전달
    dispatch(infochange(v));
    dispatch(infoshow(true));
    setIsHover(null);
  };

  const MouseOver = (i) => {
    infoShow ? setIsHover(null) : setIsHover(i);
  };

  return (
    <ChallengeDiv>
      <TitleBox>
        <Title>challenge</Title>
        <Title>
          Challenge에 참여하고, 기부에 동참해주세요! (참여당 1000원이
          기부됩니다.)
        </Title>
      </TitleBox>
      {challenge.map((v, i) => (
        <React.Fragment key={i}>
          <ChallengeItems
            onMouseOver={() => MouseOver(i)}
            onMouseOut={() => setIsHover(null)}
            onClick={() => clickChallenge(v)}
          >
            <ChallengeItem>{v.name}</ChallengeItem>
            {isHover === i && <GoInfoIcon />}
          </ChallengeItems>
        </React.Fragment>
      ))}
    </ChallengeDiv>
  );
}
