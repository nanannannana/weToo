import React from 'react';
import { useState } from 'react';
import crewdata from '../../crewdata.js';

export default function Crew1() {
  let [crews] = useState(crewdata);
  return (
    <>
      <div>
        <div>Weto</div>
        <div>
          <div class="crewName">{crews.title}</div>
          <div>{crews.info}</div>
          <button>채팅방입장</button>
        </div>
      </div>
    </>
  );
}
