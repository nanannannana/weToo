import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/mypage/NavBar';
import { Pagination } from 'antd';
import { crewChange, crewPagination, modalShow } from '../store/modules/crew';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import CrewModal from '../components/crew/CrewModal';

const InfoTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
`;

export default function ChatPage() {
  // console.log('Chatpage, 크루정보불러와서 2번 렌더링일어남')
  let socket = io.connect('http://localhost:8000');
  const user = sessionStorage;
  const [crew, setCrew] = useState([]);
  console.log('크루게시물', crew);
  const [display, setDisplay] = useState(0);
  const [currentCrew, currentCrewSet] = useState('');
  const page = useSelector((state) => state.crew.page);
  const crewPagi = crew.slice(page * 6, page * 6 + 6);
  const dispatch = useDispatch();
  const changeNum = (e) => dispatch(crewPagination(e - 1));
  const change = useSelector((state) => state.crew.crewChange);
  console.log('user 확인: ', user.city.split('/')[1]);
  console.log('change', change);

  useEffect(() => {
    dispatch(crewPagination(0));
    dispatch(modalShow(false));
    dispatch(crewChange(false));
  }, [change]);

  async function AllmatePostLoad() {
    const city =
      user.city === undefined ? '서울특별시' : user.city.split('/')[1];
    const data = await axios({
      method: 'get',
      url: `/crew/showCrew`,
      params: {
        city: city,
      },
    });
    setCrew(data.data);
  }

  async function joinCrew() {
    console.log('현재 크루', currentCrew);
    if (currentCrew.users?.find((e) => e.nickName == user.nickName)) {
      //데미더이터
      //내 유저 아이디와 같은게 있다면
      //입장
      setDisplay(2);
      alert('입장');
    } else if (currentCrew.max <= currentCrew.users?.length) {
      alert('인원이 초과되었습니다.');
    } else {
      const data = await axios({
        method: 'post',
        url: '/mate/addcrew',
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
      url: '/mate/outcrew',
      data: {
        // User_id: user.id, //더미데이터
        crewId: currentCrew.id,
      },
    });
    socket.emit('outCrew', { nickName: user.nickName, currentCrew });
    setDisplay(1);
    // setDisplay((state) => !state);
  }

  function selectCrew(e) {
    currentCrewSet(e);
    setDisplay(1);
    if (display == 2) {
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
    socket.on('outCrew', (data) => {
      //인원 제한시 실시간으로 반영하기 위해 사용
      console.log('socket outCrew');
      console.log(crew);
      console.log(data);

      setCrew((state) => {
        return state.map((e) => {
          console.log(e.id, data.currentCrew.id);
          if (e.id == data.currentCrew.id) {
            const users = e.users.filter((ee) => ee.nickName != data.nickName);
            console.log(e.users);
            console.log(users);
            delete e.users;
            e['users'] = users;
          }
          return e;
        });
      });
    });

    return () => {
      socket.off('joinCrew');
      socket.off('outCrew');
    };
  }, [currentCrew, change]);

  // 크루 생성 모달 나타나게 하기
  const ModalShow = () => dispatch(modalShow(true));

  // 크루 삭제
  const crewDel = (v) => {
    axios
      .delete('/crew/crewDel', {
        data: {
          id: v.id,
          image: v.image,
        },
      })
      .then(() => {
        alert('삭제가 완료되었습니다!');
        dispatch(crewChange(true));
      });
  };

  return (
    <>
      <NavBar />
      <CrewModal />
      <Button variant="light" onClick={ModalShow}>
        +crew
      </Button>
      <div className="chatPage">
        <div className="AllCrewPost">
          {crewPagi.map((e, i) => (
            <div className="crewDiv" key={i}>
              <div
                style={{ backgroundImage: `url(${e.image})` }}
                className="crewPost"
                key={i}
                onClick={() => selectCrew(e)}
              ></div>
              <div className="crewPostTitle">
                {/* <h3>{e.title}</h3> */}

                <InfoTitle key={i}>{e.title}</InfoTitle>

                <div onClick={() => crewDel(e)}>❎</div>
              </div>
            </div>
          ))}
        </div>

        {display == 0 ? (
          <div className="defaultChat">
            <div>
              <div>Weto</div>
              <div> Welcome to the Weto!!😊</div>
            </div>
          </div>
        ) : display == 1 ? (
          <div className="CrewInfoBox">
            <h4>{currentCrew.title}</h4>
            <p>가입 인원수 : 0/{currentCrew.max}</p>
            <p>채팅 참여중인 인원수 : ^^</p>
            <p>{currentCrew.info}</p>
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
      <Pagination
        defaultCurrent={page}
        defaultPageSize={6}
        total={crew.length}
        onChange={(e) => changeNum(e)}
      />

      {/* {crew.map((e, i) => (
        <button key={i} onClick={() => selectCrew(e)}>
          게시물
        </button>
      ))} */}
    </>
  );
}
