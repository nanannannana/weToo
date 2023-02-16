import React, { useState } from 'react';
import Chat from './Chat';
import { io } from 'socket.io-client';

let socket = io.connect('http://localhost:8000');

export default function ChatPage() {
  // const [room, setRomm] = useState([
  //   { title: '용산역 일 등 러닝 크루!!', id: 1, max: 4, member: [] },
  //   { id: 2, max: 3 },
  //   { id: 3, max: 5 },
  // ]);
  // const [display, setDisplay] = useState(true);
  // const [currentRoom, currentRoomSet] = useState('');
  // const join = async () => {
  //   // if(currentRoom == ''){
  //   //   return alert('방을 선택해주세요')
  //   // }
  //   if (currentRoom.member.find()) {
  //     //내 유저 아이디와 같은게 있다면
  //     //입장
  //     setDisplay((state) => !state);
  //   } else if (currentRoom.max <= currentRoom.length) {
  //     return alert('인원이 초과되었습니다.');
  //   } else {
  //     //입장
  //     setDisplay((state) => !state);
  //   }
  //   // const data = await axios({
  //   //   method: 'post',
  //   //   url: 'http://localhost:8000/chat/message',
  //   //   data: {
  //   //
  //   //   },
  //   // });
  // };
  // return (
  //   <div>
  //     {room.map((e, i) => (
  //       <button
  //         key={i}
  //         onClick={() => {
  //           currentRoomSet(e);
  //           if (!go) {
  //             setGo((state) => !state);
  //             socket.emit('roomOut');
  //           }
  //         }}
  //       >
  //         게시물
  //       </button>
  //     ))}
  //     {go ? (
  //       <button onClick={() => join()}>입장</button>
  //     ) : (
  //       <Chat setGo={setGo} currentRoom={currentRoom} socket={socket} />
  //     )}
  //   </div>
  // );
}
