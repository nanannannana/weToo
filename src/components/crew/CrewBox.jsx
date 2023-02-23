import React, { useEffect, useState } from 'react';
import crewdata from '../../crewdata.js';
// import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CrewBox.module.css';
import ChatBox from './ChatBox.jsx';
import { crewDel, detailShow, infoShow } from '../../store/modules/crew';
import axios from 'axios';

const CrewBox = () => {
  const crew = useSelector((state) => state.crew.crewInfo);
  console.log('crew', crew);
  const user = useSelector((state) => state.user.userInfo);
  console.log('user', user);

  const dispatch = useDispatch();
  useEffect(() => {}, [crew]);

  const handleClickButton = (v) => {
    dispatch(infoShow(true));
    dispatch(detailShow(v));
  };

  const CrewDel = (v) => {
    axios
      .delete('http://localhost:8000/crew/crewDel', {
        data: {
          id: v.id,
          image: v.image,
        },
      })
      .then(() => {
        alert('삭제가 완료되었습니다!');
        dispatch(crewDel(true));
      });
  };

  return (
    <>
      <div className={classes.crewBoxContainer}>
        {crew.map((v, i) => (
          <React.Fragment key={i}>
            <div className={classes.crewBox}>
              <img
                alt="img"
                src={v.image}
                className={classes.crewImg}
                onClick={() => handleClickButton(v)}
              />
              <button
                // variant="light"
                className={classes.crewBtn}
                onClick={() => handleClickButton(v)}
                key={i}
              >
                {v.title}
              </button>
              {user.nickName === v.User_nickName ? (
                <button className={classes.delBtn} onClick={() => CrewDel(v)}>
                  ❎
                </button>
              ) : (
                true
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className={classes.mainChatBox}>
        <ChatBox />
      </div>
    </>
  );
};

export default CrewBox;
