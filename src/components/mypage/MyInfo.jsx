import React, { useState } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  width: 300px;
  height: 100%;
  background-color: #faf9f9;
  border: 0.5px solid black;
  text-align: center;
`;
const Logo = styled.p`
  width: 137px;
  height: 65px;
  margin: 70px auto -10px;

  font-family: 'Port Lligat Slab';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 64px;
  cursor: pointer;
`;
const ID = styled.input`
  width: 70%;
  height: 8%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const PW = styled.input`
  width: 70%;
  height: 8%;
  padding: 10px;
  margin: 8px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const ErrorMSG = styled.div`
  width: 62%;
  margin: auto;
  color: red;
  font-size: 10%;
  text-align: left;
  font-family: 'Port Lligat Slab';
`;
const Line = styled.span`
  color: #d8d8d8;
`;
const LoginBtn = styled.button`
  width: 70%;
  height: 8%;
  border: 1px solid #d8d8d8;
  cursor: pointer;
  font-family: 'Port Lligat Slab';
  background-color: black;
  color: white;

  &:disabled {
    /* background-color: unset;
    color: black;
    cursor: initial; */
  }
`;
const JoinBtn = styled.button`
  width: 70%;
  height: 8%;
  border: 1px solid #d8d8d8;
  cursor: pointer;
  font-family: 'Port Lligat Slab';
  background-color: black;
  color: white;
`;

export default function MyInfo() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <Div>
        <Logo onClick={() => window.open('/', '_self')}>MyPage</Logo>
        <p>이름 {sessionStorage.id}</p>
        <p>닉네임{sessionStorage.nickname}</p>
        <p>핸드폰</p>
        <p>address{sessionStorage.city}</p>

        <p>참여중인 동네{sessionStorage.address}</p>

        <button>정보수정</button>

        <p>crew</p>

        <p>challenge</p>

        <button>회원탈퇴</button>
      </Div>
    </>
  );
}
