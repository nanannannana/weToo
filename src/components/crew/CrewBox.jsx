import React from 'react';
import Inform from '../crew/Inform';
import crewdata from '../../crewdata.js';
import { useState } from 'react';
import './CrewBox.css';

export default function CrewBox() {
  let [crews] = useState(crewdata);
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
      {crews.map((a, i) => {
        return <Card crews={crews[i]} i={i} />;
      })}

      <Inform />
    </>
  );
}

function Card(props) {
  return (
    <div className="containerBox">
      <div className="crewBox">
        <img alt="img" src={props.crews.img} width="80%" />
        <h4>{props.crews.title}</h4>
        <p>{props.crews.price}</p>
      </div>
    </div>
  );
}
