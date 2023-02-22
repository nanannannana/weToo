import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { userJoin } from '../store/modules/register';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  width: 69%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const Name = styled.input`
  width: 69%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const Nickname = styled.input`
  width: 69%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const PW = styled.input`
  width: 69%;
  height: 3%;
  padding: 10px;
  border: 1px solid #d8d8d8;
  ::placeholder {
    font-size: 3px;
  }
`;
const City = styled.select`
  width: 69%;
  height: 6%;
  padding-left: 7px;
  border: 1px solid #d8d8d8;
  font-size: 10px;
  ::placeholder {
    font-size: 3px;
  }
`;
const Address = styled.input`
  width: 69%;
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
  margin: 20px;
  border: 1px solid #d8d8d8;
  cursor: pointer;
  font-family: 'Port Lligat Slab';
  background-color: black;
  color: white;
`;
export default function JoinBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
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
  const registerAddress = (e) => {
    setAddress(e.target.value);
  };

  const register = async () => {
    try {
      const request = await axios({
        method: 'post',
        url: 'http://localhost:8000/auth/signup',
        data: {
          id: id,
          pw: pwd,
          city: city,
          // address: address
          name: name,
          nickName: nickname,
        },
      });

      dispatch(userJoin(request.data));
      alert('회원가입 성공');
      navigate('/login');
    } catch (err) {
      if (err.response.data === '존재하는 ID입니다.') {
        alert('존재하는 ID입니다');
        setId('');
      } else if (err.response.data === '존재하는 닉네임입니다.') {
        alert('존재하는 닉네임입니다.');
        setNickname('');
      }
    }
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
        <ID placeholder="ID" value={id} onChange={registerId} required />
        <br />
        <PW
          placeholder="Password"
          value={pwd}
          type={'password'}
          onChange={registerPwd}
          required
        />
        <div>----------side info----------</div>
        <City name="items1" onChange={registerCity} required>
          <option value="">Address</option>
          <option value="seoul">서울특별시</option>
          <option value="Daejeon">세종특별시</option>
          <option value="Incheon">인천광역시</option>
          <option value="Gwangju">광주광역시</option>
          <option value="Ulsan">울산광역시</option>
          <option value="Daejeon">대전광역시</option>
          <option value="Daegu">대구광역시</option>
          <option value="Busan">부산광역시</option>
          <option value="Gyeonggi-do">경기도</option>
          <option value="Gangwon-do">강원도</option>
          <option value="Chungcheongbuk-do">충청북도</option>
          <option value="Chungcheongnam-do">충청남도</option>
          <option value="Gyeongsangbuk-do">경상북도</option>
          <option value="Gyeongsangnam-do">경상남도</option>
          <option value="Jeollabuk-do">전라북도</option>
          <option value="Jeollanam-do">전라남도</option>
          <option value="Jeju-do">제주도</option>
        </City>
        <Address placeholder="City" value={address} onChange={registerAddress} required/>
        <Joinbtn onClick={() => register()}>Create an Account</Joinbtn>
      </Div>
    </>
  );
}
