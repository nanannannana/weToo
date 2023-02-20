import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function ChatPage() {
  // console.log('Chatpage, 크루정보불러와서 2번 렌더링일어남')
  let socket = io.connect('http://localhost:8000');
  const user = useSelector((state) => state.user.userInfo)
  console.log(user)
  const [crew, setCrew] = useState([

  ]);
  console.log(crew)
  const [display, setDisplay] = useState(true);
  const [currentCrew, currentCrewSet] = useState('');
  console.log(currentCrew)

  async function AllmatePostLoad() {
    const data = await axios({
      method: 'get',
      url: `http://localhost:8000/mate`,
    });
    console.log(data);
    setCrew(data.data);
  }



  useEffect(() => {
    AllmatePostLoad();
    socket.on("joinCrew", (data) => { //인원 제한시 실시간으로 반영하기 위해 사용
      console.log("socket join crew")
      console.log(crew)
      
      setCrew((state) => {
        return state.map(e => {
          console.log(e.id, currentCrew.id)
          if(e.id == currentCrew.id){
             e.users = [...e.users, {nickName: data.nickName}]
          }
          return e
        })
      })
      // const currentCrew = crew.filter(e => e.id == currentCrew.id)
      // console.log(currentCrew.users)
      // currentCrew.users = [...currentCrew.users, {nickName: data.nickName}]
      // console.log(crewAdded)
      // setCrew((state => ({...state, currentCrew})))
    })

    return () => {
      socket.off('joinCrew');
    };
  }, [currentCrew]);

 
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
          // User_id: user.id, //더미데이터
          crewId: currentCrew.id,
        },
      });
      console.log(data);
      alert('가입을 축하드립니다.')
      console.log('crew', crew)
      console.log("socekt", socket)
      socket.emit('joinCrew', { nickName: user.nickName, currentCrew })
      setDisplay((state) => !state);
    }
  }

  async function outCrew() {
      alert('정말로 탈퇴하시겠습니까?');

      const data = await axios({
        method: 'delete',
        url: 'http://localhost:8000/mate/outcrew',
        data: {
          // User_id: user.id, //더미데이터
          crewId: currentCrew.id,
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
