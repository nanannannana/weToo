import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import NavBar from '../components/mypage/NavBar'

export default function ChatPage() {
  // console.log('Chatpage, 크루정보불러와서 2번 렌더링일어남')
  let socket = io.connect('http://localhost:8000');
  const user = useSelector((state) => state.user.userInfo);
  const [crew, setCrew] = useState([]);
  console.log(crew);
  const [display, setDisplay] = useState(0);
  const [currentCrew, currentCrewSet] = useState('');
  console.log(currentCrew);

  async function AllmatePostLoad() {
    const data = await axios({
      method: 'get',
      url: `http://localhost:8000/mate`,
    });
    setCrew(data.data);
  }

  async function joinCrew() {
    if (currentCrew.users.find((e) => e.nickName == user.nickName)) {
      //데미더이터
      //내 유저 아이디와 같은게 있다면
      //입장
      setDisplay(2);
      alert('입장');
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
      alert('가입을 축하드립니다.');
      socket.emit('joinCrew', { nickName: user.nickName, currentCrew });
      setDisplay(2);
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
    setDisplay(1);
    if (display == 2 ) {
      socket.emit('roomOut', {
        currentCrewId: currentCrew.id,
        nickName: user.nickName,
      });
    }
  }

  useEffect(() => {
    AllmatePostLoad();
    socket.on('joinCrew', (data) => {
      //인원 제한시 실시간으로 반영하기 위해 사용
      console.log('socket join crew');
      console.log(crew);
      console.log(data);

      setCrew((state) => {
        return state.map((e) => {
          console.log(e.id, data.currentCrew.id);
          if (e.id == data.currentCrew.id) {
            e.users = [...e.users, { nickName: data.nickName }];
          }
          return e;
        });
      });
      // currentCrewSet((state) => {
      //   if (state.id == data.currentCrew.id) {
      //     state.users = [...state.users, { nickName: data.nickName }];
      //   }
      //   return state;
      // });
      // const currentCrew = crew.filter(e => e.id == currentCrew.id)
      // console.log(currentCrew.users)
      // currentCrew.users = [...currentCrew.users, {nickName: data.nickName}]
      // console.log(crewAdded)
      // setCrew((state => ({...state, currentCrew})))
    });

    return () => {
      socket.off('joinCrew');
    };
  }, [currentCrew]);

  return (
    <>
      <NavBar/>
      <div>

      </div>
      <div className='chatPage'>
      <div className='AllCrewPost'>
      {crew.map((e, i) => (
        <>
        <div style={{backgroundImage: 'url(./runcrew.png)'}} className='crewPost' key={i} onClick={() => selectCrew(e)}>
        <h3>같이 운동해요~</h3>
        </div>
        </>

      ))}
      </div>

        
      {display == 0 ? 
      <div className='defaultChat'>
        <img src="./chatdefault.jpg" alt="" />
        <h4>THE YOGA DAY CREW</h4>
        <p>
안녕하세요<br/> 
매일 하루를 요가와 함께하는
THE  YOGA DAY  CREW 입니다~:)</p>
      </div> 
       : display == 1 ? (
        <div className='CrewInfoBox'>
          <h4>같이 운동해요~</h4>
          <span>인원수 : 3/4</span>
          <p>크루정보(공지) 뭐든 디테일한 정보들 : 열심히 참여할 분, 하루에 물 3컵, 6시 어디서 정모 등  </p>
          <button onClick={() => joinCrew()}>입장</button>
          <button onClick={() => outCrew()}>탈퇴</button>
        </div>
      ) : (
        <Chat
          setDisplay={setDisplay}
          currentCrew={currentCrew}
          socket={socket}
          user={user}
        />
      )}
      </div>
      
    
      {/* {crew.map((e, i) => (
        <button key={i} onClick={() => selectCrew(e)}>
          게시물
        </button>
      ))} */}
      
    </>
  );
}
