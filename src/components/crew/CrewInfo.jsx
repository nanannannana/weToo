import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

export default function CrewInfo() {
  const crew = useSelector((state) => state.crew.crewDetail);
  useEffect(() => {}, [crew]);
  const handleClickChatButton = () => {};

  return (
    <>
      <img src={crew.image} style={{ width: '100px', height: '100px' }} />
      <div>{crew.title}</div>
      <div>{crew.info}</div>
      <div>{crew.User_nickName}</div>
      <Button variant="light" onClick={() => handleClickChatButton()}>
        채팅방 입장
      </Button>
    </>
  );
}
