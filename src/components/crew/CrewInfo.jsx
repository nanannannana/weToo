import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import classes from './CrewBox.module.css';

export default function CrewInfo() {
  const crew = useSelector((state) => state.crew.crewDetail);
  useEffect(() => {}, [crew]);
  const handleClickChatButton = () => {};

  return (
    <>
      <img src={crew.image} className={classes.crewImg} />
      <h4>{crew.title}</h4>
      <p>안녕하세요! {crew.title}입니다:)</p>
      <p>{crew.info}</p>
      {/* <div>{crew.User_nickName}</div> */}
      <Button variant="light" onClick={() => handleClickChatButton()}>
        채팅방 입장
      </Button>
    </>
  );
}
