import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { io } from 'socket.io-client';
import axios from 'axios';

let socket = io.connect('http://localhost:8000');

export default function ChatPage() {
  console.log(socket);
  const [room, setRomm] = useState([
    { title: '용산역 일 등 러닝 크루!!', id: 1, max: 4, member: [] },
    { id: 2, max: 3 },
    { id: 3, max: 5 },
  ]);
  const [display, setDisplay] = useState(true);
  const [currentCrew, currentCrewSet] = useState('');
  console.log(currentCrew);

  useEffect(() => {
    AllmatePostLoad();
  }, []);

  async function AllmatePostLoad() {
    const data = await axios({
      method: 'get',
      url: `http://localhost:8000/mate`,
    });
    console.log(data);
    setRomm(data.data);
  }

  async function joinCrew() {
    if (currentCrew.users.find((e) => e.nickName == 'ㅁㄴㅇ')) {
      //데미더이터
      //내 유저 아이디와 같은게 있다면
      //입장
      setDisplay((state) => !state);
    } else if (currentCrew.max <= currentCrew.users.length) {
      alert('인원이 초과되었습니다.');
    } else {
      const data = await axios({
        method: 'post',
        url: `http://localhost:8000/mate/addcrew`,
        data: {
          nickName: 'ㅁㄴㅇ', //더미데이터
          currentCrew: currentCrew.id,
        },
      });
      console.log(data);
      setDisplay((state) => !state);
    }
  }

  function selectCrew(e) {
    currentCrewSet(e);
    if (!display) {
      setDisplay((state) => !state);
      socket.emit('roomOut');
    }
  }

  return (
    <div>
      {room.map((e, i) => (
        <button key={i} onClick={() => selectCrew(e)}>
          게시물
        </button>
      ))}
      {display ? (
        <button onClick={() => joinCrew()}>입장</button>
      ) : (
        <Chat
          setDisplay={setDisplay}
          currentCrew={currentCrew}
          socket={socket}
        />
      )}
    </div>
  );
}
