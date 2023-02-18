import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function ChatPage() {
  console.log('Chatpage, 크루정보불러와서 2번 렌더링일어남')
  let socket = io.connect('http://localhost:8000');
  // const [nickName, setnick] = useState(`user${Math.round(Math.random() * 2)}`);
  // const [id, setId] = useState(nickName);
  // const [user, setUser] = useState({
  //   id: id,
  //   nickName: nickName
  // })
  const user = useSelector((state) => state.user.userInfo)
  console.log(user)
  const [crew, setCrew] = useState([

  ]);
  const [display, setDisplay] = useState(true);
  const [currentCrew, currentCrewSet] = useState('');
  console.log(currentCrew)





  useEffect(() => {
    AllmatePostLoad();
  }, []);

  async function AllmatePostLoad() {
    const data = await axios({
      method: 'get',
      url: `http://localhost:8000/mate`,
    });
    console.log(data);
    setCrew(data.data);
  }

  async function joinCrew() {

    if (currentCrew.users.find((e) => e.nickName == user.nickName)) {
      //데미더이터
      //내 유저 아이디와 같은게 있다면
      //입장
      setDisplay((state) => !state);
      alert('입장')
    } else if (currentCrew.max <= currentCrew.users.length) {
      alert('인원이 초과되었습니다.');
    } else {
      const data = await axios({
        method: 'post',
        url: 'http://localhost:8000/mate/addcrew',
        data: {
          User_id: user.id, //더미데이터
          Crew_id: currentCrew.id,
        },
      });
      console.log(data);
      alert('가입을 축하드립니다.')
      console.log('crew', crew)
      const crewAdded = crew.map(e => {
        if(e.id == currentCrew.id){
          e.users.push({nickName: user.nickName})
        }
        return e 
      })
      setCrew(crewAdded)
      setDisplay((state) => !state);
    }
  }

  async function outCrew() {
      alert('정말로 탈퇴하시겠습니까?');

      const data = await axios({
        method: 'delete',
        url: 'http://localhost:8000/mate/outcrew',
        data: {
          nickName: user.nickName, //더미데이터
          id: currentCrew.id,
        },
      });
      console.log(data);
      // setDisplay((state) => !state);
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
      {crew.map((e, i) => (
        <button key={i} onClick={() => selectCrew(e)}>
          게시물
        </button>
      ))}
      {display ? (
        <>
        <button onClick={() => joinCrew()}>입장</button>
        <button onClick={() => outCrew()}>탈퇴</button>
        </>
      ) : (
        <Chat
          setDisplay={setDisplay}
          currentCrew={currentCrew}
          socket={socket}
          user={user}
        />
      )}
    </div>
  );
}
