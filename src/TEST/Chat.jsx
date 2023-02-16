import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./chat.css";


export default function Chat({setGo, currentRoom, socket }) {
  console.log('ChatComponent')
  console.log(currentRoom)
  const [socketId, setSocketId] = useState(socket.id);
  const [chatting, setChatting] = useState([]);
  const inputValue = useRef(null);
  const [nickName, setnick] = useState(`user${Math.round(Math.random()*10)}`);
  const [id, setId] = useState(String(Math.ceil(Math.random()*3)));
  const room = useRef();
  

  useEffect(() => {
    console.log('notice useEffet')
    socket.emit("notice", { nickName, currentRoom });
    socket.on("notice", (data) => {
      if(data.msg.split('님')[0] != 'undefined'){
        data["nickName"] = nickName
        setChatting((chatting) => [...chatting, data]);
      }
      //chat페이지에서 새로고침시에 disconnect가 발생하는데 화면에 그리지 않기 위해 조건사용
    });
    socket.emit("join", { currentRoom : currentRoom.id });
    //room을 선택해 입장을 누르면 컴포넌트가 마운트 되면서 방에 입장
    return () => {
      socket.off("notice");
    };
  }, [])
  //소켓이 변한다는건 다른 유저가 들어왔다는 거다 그래서 변할 때마다 공지를 해준다.


  
  
  
  useEffect(() => {
    console.log('Msg useEffet')
    socket.on("newMsg", (data) => {
      if (socketId == data.from) {
        data["liClassName"] = "myMessage";
      } else {
        data["liClassName"] = "yourMessage";
        data["divClassName"] = "yourProfile";
      }
      setChatting((chat) => [...chat, data]);
      room.current.scrollTop = room.current.scrollHeight;

    });
    return () => {
      socket.off("newMsg");
    };
  },[socketId]); 
  //socketId를 안 넣으면 맨 처음 빈 소켓아이디여서 상대글로 인식한다.


 

  
  

  const sendMessage = async () => {
    socket.emit("sendMsg", { msg: inputValue.current.value, nickName, currentRoom }); //게시물 id도 같이 보내야한다.
    const data = await axios({
      method: 'post',
      url: 'http://localhost:8000/chat/message',
      data: {
        chat: inputValue.current.value,
        id,
        room : currentRoom.id 
      },
    });
    inputValue.current.value = "";
  };
  // const SelectOnChange = (e) => setTo(e.target.value);
  return (
    <div className="relative">
        <div className="roomTitle">{currentRoom.title}</div>
      <div ref={room} className="room">
        <ul>
          {chatting.map((data, i , chat) => {
            return (
              data.type == 'notice' ? 
              <p key={i}>{data.msg}</p>
              :
              data.from == socketId ? 
              <li className='myMessage' key={i}>
                 <p>{data.msg}</p>
              </li>
              :
              chat[i-1]?.from == data.from ? 
              <li className="yourMessage" key={i}>
                <p>{data.msg}</p>
              </li> :
              <li className="yourMessage" key={i}>
                <div className="yourProfile">
                  <img
                    src="https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927"
                    width="40"
                    height="40"
                    alt=""
                  />
                  <h3>{data.nickName}</h3>
                </div>
                <p>{data.msg}</p>
              </li>
            );
          })}
        </ul>
        <form action="">
          <input
            ref={inputValue}
            type="text"
            id="msg_box"
            // onkeyDown="enter()"
          />
          <button type="button" onClick={() => sendMessage()}>
            입력
          </button>
        </form>
      </div>
      <button className="exit" onClick={() => {
        console.log(1)
        setGo((state) => !state)
        socket.emit('roomOut')
      }}>나가기</button>
    </div>
  );
}