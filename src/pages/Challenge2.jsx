import React, { useEffect, useState } from 'react';
import NavBar from '../components/mypage/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  goupload,
  infochange,
  infoshow,
  modal,
} from '../store/modules/challenge';
import Chinfo from '../components/challenge/Chinfo';
import ChChallenge from '../components/challenge/ChChallenge';
import ChModal from '../components/challenge/ChModal';

export default function Challenge2() {
  const dispatch = useDispatch();
  // challenge 참여 완료 시, modal창 나타남
  const modalShow = useSelector((state) => state.challenge.modal);
  // challenge 제목 click 시, info창 나타남
  const infoShow = useSelector((state) => state.challenge.infoShow);

  useEffect(() => {
    // challenge 페이지 렌더링 시, state 초기값으로 재설정
    dispatch(infochange({}));
    dispatch(infoshow(false));
    dispatch(modal(false));
    dispatch(goupload(false));
  }, []);

  return (
    <>
      <NavBar />
      {modalShow && <ChModal />}
      <ChChallenge />
      {infoShow && <Chinfo />}
    </>
  );
}
