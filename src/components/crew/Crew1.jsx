import React from 'react';
import './Crew1.css';
import { useState } from 'react';
import crewdata from '../../crewdata.js';

export default function Crew1() {
  let [crews] = useState(crewdata);
  return (
    <>
      <div>
        <div id="chatHeader">Weto</div>
        <div id="chatLog">
          <div class="anotherMsg">
            <span class="anotherName">YOGACREW</span>
            <span class="msg">안녕? 반가워</span>
          </div>
          <div class="myMsg">
            <span class="msg">나도 반가워!</span>
          </div>
          <button>채팅방입장</button>
        </div>
      </div>
    </>
  );
}
