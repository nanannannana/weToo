import React from 'react';
import crewdata from '../../crewdata.js';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Crew1 from '../crew/Crew1';
import Crew2 from '../crew/Crew2';
import classes from './CrewBox.module.css';
import ChatBox from './ChatBox.jsx';
import styled from 'styled-components';

const CrewBox = () => {
  let [crews] = useState(crewdata);
  const [content, setContent] = useState({
    id: 0,
    title: 'Weto',
    content: 'Welcome to the Weto!!😊',
  });

  const handleClickButton = (e) => {
    const { id } = e.target;
    setContent(id);
    console.log(id);
  };

  //   {
  //     id: [1, 2, 3, 4],
  //     title: ['yogacrew', 'cyclecrew', 'runcrew', 'swimcrew'],
  //     info: [
  //       '오늘 하루도 요가와 함께해요~:)',
  //       '싸이클 좋아하세요?',
  //       '함께 달려요!',
  //       '오늘도 스윔스윔!!',
  //     ],
  //     image: ['yogacrew.png', 'cyclecrew.png', 'runcrew.png', 'swimcrew.png'],
  //   },
  // ];

  return (
    <>
      <div className={classes.crewBoxContainer}>
        {crews.map((data, i) => {
          return (
            <>
              <div className={classes.crewBox}>
                <Card crews={crews[i]} i={i} />
                <Button
                  variant="light"
                  onClick={handleClickButton}
                  id={data.id}
                  key={data.id}
                >
                  {data.title}
                </Button>
              </div>
            </>
          );
        })}

        {/* {content && <div className={classes.CrewContentBox}>sdfsf</div>} */}
      </div>
      <div className={classes.mainChatBox}>
        <ChatBox content={content} />
      </div>
    </>
  );
};

export default CrewBox;

function Card(props) {
  let [crews] = useState(crewdata);
  return (
    <div>
      <div>
        <img alt="img" src={props.crews.img} className={classes.crewImg} />
      </div>
    </div>
  );
}
