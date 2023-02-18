import React from 'react';
import crewdata from '../../crewdata.js';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Crew1 from '../crew/Crew1';
import Crew2 from '../crew/Crew2';
import classes from './CrewBox.module.css';

const CrewBox = () => {
  let [crews] = useState(crewdata);
  const [content, setContent] = useState();
  const handleClickButton = (e) => {
    const { id } = e.target;
    setContent(id);
    console.log(id);
  };
  const selectComponent = {
    1: <Crew1 />,
    2: <Crew2 />,
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
    <div className={classes.crewBoxContainer}>
      {crews.map((data, i) => {
        return (
          <>
            <div className={classes.crewBox}>
              <Card crews={crews[i]} i={i} />
              <Button
                className={classes.crewBtn}
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

      {content && <div>{selectComponent[content]}</div>}
    </div>
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
