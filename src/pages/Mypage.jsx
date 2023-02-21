import React from 'react';
import Info from '../components/mypage/Info';
import NavBar from '../components/mypage/NavBar';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Mypage() {
  return (
    <>
      <NavBar />
      <Info />
    </>
  );
}
