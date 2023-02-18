import React from 'react';
import styled from 'styled-components';

const Nav1 = styled.ul`
position: absolute;
width: 80%;
height:90%;
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
cursor: pointer;
`;

const List1 = styled.li`
position: relative;
left: 35%;
top: 2%;
float: left;
margin-right:15px;

font-family: 'Port Lligat Slab';
font-size: 20px;
cursor: pointer;
`;
const List2 = styled.li`
position: relative;
right: -100%;
bottom : 88%;
float: left;
margin-right:15px;

font-family: 'Port Lligat Slab';
font-size: 15px;
cursor: pointer;
`;

const Vline = styled.div`
border-left: thin solid black;
width: 5%;
height: 98%;
position:relative;
left: 65%;
`;

export default function Header() {
  return <>
    <Nav1>
      <Logo onClick={() => window.open('/', '_self')}>WeTo</Logo>
      <List1>CREW</List1>
      <List1>COMMUNITY</List1>
      <Vline />
      <List2 onClick={() => window.open('/Login', '_self')}>LOGIN</List2>
      <List2 onClick={() => window.open('/Join', '_self')}>JOIN</List2>
    </Nav1>
  </>;
}
