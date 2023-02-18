import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { userInfoCreate } from '../store/modules/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Div = styled.div`
position: absolute;
top: 50%;
left: 50%;
margin:-200px 0 0 -150px;
width:300px;
height: 400px;
background-color: #FAF9F9;
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
border: 1px solid #D8D8D8;
::placeholder{
  font-size: 3px;
}
`;
const PW = styled.input`
width: 62%;
height: 3%;
padding: 10px;
margin: 8px;
border: 1px solid #D8D8D8;
::placeholder{
  font-size: 3px;
}
`;
const ErrorMSG = styled.div`
width:62%;
margin:auto;
color:red;
font-size:10%;
text-align:left;
`;
const Line = styled.span`
color: #D8D8D8;
`;
const LoginBtn = styled.button`
width: 70%;
height: 8%;
border: 1px solid #D8D8D8;
cursor: pointer;
font-family: 'Port Lligat Slab';
background-color : black;
color:white;
&:disabled {
  background-color: unset;
  color:black;
}
`;
const JoinBtn = styled.button`
width: 70%;
height: 8%;
border: 1px solid #D8D8D8;
cursor: pointer;
font-family: 'Port Lligat Slab';
background-color : black;
color:white;
`;

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate();

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
    </Div>
    </>
  );
}
