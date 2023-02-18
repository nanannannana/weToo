import React from 'react';
import { useState } from 'react';
import crewdata from '../../crewdata.js';
import classes from './Crew1.module.css';

export default function Crew1() {
  let [crews] = useState(crewdata);
  return (
    <>
      <div>
        <div>Weto</div>
        <div className={classes.crewName}>YOGACREW</div>
        <div className={classes.crewInfoBox}>
          오늘 하루도 요가와 함께해요~😊
        </div>
      </div>
      <button>채팅방입장</button>
    </>
  );
}
