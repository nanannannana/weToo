import React from 'react';
import { useState } from 'react';
import crewdata from '../../crewdata.js';
import classes from './ChatBox.module.css';

export default function ChatBox({ content }) {
  let [crews] = useState(crewdata);

  // const onUpdate = () => {
  //   setCrewsDisplay({ ...crewsDisplay, onAdd });
  // };
  return (
    <div className={classes.ChatBoxContainer}>
      <div>
        <div className={classes.mainName}>{content.title}</div>
        <div className={classes.mainContent}> {content.content}</div>
      </div>
    </div>
  );
}
