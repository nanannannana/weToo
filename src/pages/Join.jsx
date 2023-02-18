import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { join } from '../store/modules/register';

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
    console.log(e.target.value);
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

  let body = {
    id: id,
    pwd: pwd,
    city: city,
    name: name,
    nickname: nickname,
  };

  return (
    <>
      <Div>
        <Logo onClick={() => window.open('/', '_self')}>WeTo</Logo>
        <Name
          placeholder="Name"
          value={name}
          onChange={registerName}
          required
        ></Name>
        <br />
        <Nickname
          placeholder="Nickname"
          value={nickname}
          onChange={registerNickname}
          required
        ></Nickname>
        <br />
        <ID placeholder="ID" value={id} onChange={registerId} required />
        <br />
        <PW
          placeholder="Password"
          value={pwd}
          type={'password'}
          onChange={registerPwd}
          required
        />
        <br />
        <City placeholder="City" value={city} onChange={registerCity} />
        <br />
        <Joinbtn
          type="submit"
          onClick={() => {
            dispatch(join(body));
          }}
        >
          Create an Account
        </Joinbtn>
      </Div>
    </>
  );
}
