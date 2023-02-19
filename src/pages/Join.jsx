import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/modules/register';

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
const Name = styled.input`
  width: 62%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const Nickname = styled.input`
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
  border: 1px solid #d8d8d8;
  margin: 5px;
  ::placeholder {
    font-size: 3px;
  }
`;
const City = styled.input`
  width: 62%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const Joinbtn = styled.button`
  width: 69%;
  height: 8%;
  margin: 50px;
  border: 1px solid #d8d8d8;
  cursor: pointer;
  font-family: 'Port Lligat Slab';
  background-color: black;
  color: white;
`;
export default function JoinBox() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const registerId = (e) => {
    setId(e.target.value);
  };
  const registerPwd = (e) => {
    setPwd(e.target.value);
  };
  const registerCity = (e) => {
    setCity(e.target.value);
  };
  const registerName = (e) => {
    setName(e.target.value);
  };
  const registerNickname = (e) => {
    setNickname(e.target.value);
  };

  const signup = () => {
    let body = {
      id: id,
      pw: pwd,
      name: name,
      nickname: nickname,
      address: city,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        alert('회원가입 성공');
      } else {
        alert('회원가입 실패');
      }
    });
  };

  return (
    <>
      <Div>
        <Logo onClick={() => window.open('/', '_self')}>WeTo</Logo>
        <Name placeholder="Name" value={name} onChange={registerName}></Name>
        <br />
        <Nickname
          placeholder="Nickname"
          value={nickname}
          onChange={registerNickname}
        ></Nickname>
        <br />
        <ID placeholder="ID" value={id} onChange={registerId} />
        <br />
        <PW
          placeholder="Password"
          value={pwd}
          type={'password'}
          onChange={registerPwd}
        />
        <br />
        <City placeholder="City" value={city} onChange={registerCity} />
        <br />
        <Joinbtn onClick={signup}>Create an Account</Joinbtn>
      </Div>
    </>
  );
}
