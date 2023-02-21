import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import crewdata from '../../crewdata.js';
import classes from './ChatBox.module.css';
import CrewInfo from './CrewInfo.jsx';

export default function ChatBox() {
  let [crews] = useState(crewdata);
  const infoShow = useSelector((state) => state.crew.infoShow);

  // const onUpdate = () => {
  //   setCrewsDisplay({ ...crewsDisplay, onAdd });
  // };
  return (
    <div className={classes.ChatBoxContainer}>
      {!infoShow ? (
        <div>
          <div className={classes.mainName}>Weto</div>
          <div className={classes.mainContent}> Welcome to the Weto!!😊</div>
        </div>
      ) : (
        <CrewInfo />
      )}
    </div>
  );
}
