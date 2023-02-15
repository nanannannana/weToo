import React, { useState } from 'react'
import Chat from './Chat'
import { io } from 'socket.io-client';

let socket = io.connect('http://localhost:8000');

export default function ChatPage() {
  const [room, setRomm] = useState([
    {title: '용산역 일 등 러닝 크루!!',id : 1, max: 4}, {id:2, max:3}, {id: 3, max:5}
  ])
  const [go, setGo] = useState(true)
  const [currentRoom, currentRoomSet] = useState('')
  return (
    <div>
      {room.map((e,i) => (
        <button key={i} onClick={() => {currentRoomSet(e); if(!go){setGo(state => !state); socket.emit('roomOut')}} } >게시물</button>
      ))}
      {go ? <button onClick={() => {setGo(state => !state)}}>입장</button> : <Chat setGo={setGo} currentRoom={currentRoom} socket={socket}  />}
    </div>
  )
}
