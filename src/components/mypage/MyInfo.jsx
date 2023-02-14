import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import './MyInfo.css';
import Modal from './Modal';
import styled from 'styled-components';

const BTN1 = styled.button`
  z-index: 1;
`;

export default function test() {
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      <div className="container">
        <div className="my_info_container">
          <div className="my_info">
            <div className="info_pic"></div>
          </div>
          <BTN1 onClick={showModal}>정보 수정</BTN1>
          {modalOpen && <Modal setModalOpen={setModalOpen} />}
          <button>회원 탈퇴</button>
        </div>

        <div className="crew_container">
          CREW
          <div className="crew_card">
            <ul>
              <li>서울걷기</li>
              <li>서울시 용산구</li>
              <li>멤버수 : 4명</li>
            </ul>
          </div>
        </div>

        <div className="challenge_container">
          참여중인 챌린지
          <div className="challenge_card">
            <ul>
              <li>요가교실</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
