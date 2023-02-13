import React from 'react';
import styled from 'styled-components';

const Nav1 = styled.ul`
position: absolute;
width: 80%;
height:100%;
left: 5%;
top: 50px;
list-style:none;
float: left;
`;

const Logo = styled.li`
position: absolute;
font-family: 'Port Lligat Slab', serif;
font-style: normal;
font-weight: 400;
font-size: 60px;
line-height: 64px;
`;

const List1 = styled.li`
position: relative;
left: 35%;
top: 2%;
float: left;
margin-right:15px;

font-family: 'Port Lligat Slab';
font-size: 20px;
`;
const List2 = styled.li`
position: relative;
right: -100%;
bottom : 88%;
float: left;
margin-right:15px;

font-family: 'Port Lligat Slab';
font-size: 15px;
`;

const Vline = styled.div`
border-left: thin solid black;
width: 5%;
height: 90%;
position:relative;
left: 65%;
`;

export default function Header() {
  return <>
    <Nav1>
      <Logo>WeTo</Logo>
      <List1>MAIN</List1>
      <List1>COMMUNITY</List1>
      <List1>GEAR</List1>
      <Vline />
      <List2>LOGIN</List2>
      <List2>JOIN</List2>
    </Nav1>

  </>;
}
