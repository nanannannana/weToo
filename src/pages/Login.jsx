import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { userInfoCreate } from '../store/modules/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { change } from '../store/modules/user';


const Div = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -200px 0 0 -150px;
  width: 300px;
  height: 400px;
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
  width: 62%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const PW = styled.input`
  width: 62%;
  height: 3%;
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
    background-color: unset;
    color: black;
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

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // user_name을 변경하는 작업
  // 1.임시 user_name 설정
  const user_name = '서새싹';
  const dispatch = useDispatch();
  // 2.useSelecter: user.jsx에 있는 initState 값을 가져오는 메서드
  const name = useSelector((state) => state.user.user_name);
  // 3.dispatch: user.jsx에 설정한 액션함수를 가져오는 메서드
  const changeName = () => dispatch(change(user_name));
  // 4.콘솔 확인(user_name)
  console.log('name: ', name);

  const idValue = (e) => {
    setId(e.target.value);
    if (id.length > 5) {
      setValid(false);
    } else {
      setValid(true);
    }
  };
  const pwValue = (e) => {
    setPw(e.target.value);
    if (pw.length > 5) {
      setPwValid(true);
    } else {
      setPwValid(true);
    }
  };

  const login = async () => {
    const data = await axios({
      method: 'post',
      url: 'http://localhost:8000/auth/login',
      data: {
        id,
        pw
      },
    });
    console.log(data);
    if(data.data.message == '로그인 성공!'){
      dispatch(userInfoCreate(data.data.data))
      alert('로그인 성공')
      navigate('/')
    }
  }

  const Loginstart = () => {if(id=='') {alert('아이디를 입력해주세요.')}};
  return (
    <>
    <Div>
      <Logo onClick={() => window.open('/', '_self')}>WeTo</Logo>
      <ID placeholder='ID' value={id}
      onChange={idValue} required/>
      <br />
      <PW placeholder='Password' value={pw}
      onChange={pwValue} type={'password'} required/>
      <br />
      <ErrorMSG></ErrorMSG>
      <br />
      <LoginBtn disabled={valid}
      onClick={() => login()}>Log In</LoginBtn>
      <br />
      <Line>--------------------------------------</Line>
     <br />
        <JoinBtn>Create an Account</JoinBtn>
        <JoinBtn onClick={() => window.open('/Join', '_self')}>Create an Account</JoinBtn>
        {/* 삭제하세욤 */}
        <br />
        <button onClick={changeName}>fkfkf</button>
      </Div>
    </>
  );
}
