import React from 'react';
import styled from 'styled-components';

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
const Line = styled.span`
  color: #D8D8D8;
`;
const Btn = styled.button`
width: 70%;
height: 8%;
border: 1px solid #D8D8D8;
cursor: pointer;
font-family: 'Port Lligat Slab';
`;

export default function Login() {
  return (
    <>
    <Div>
      <Logo onClick={() => window.open('/', '_self')}>WeTo</Logo>
      <ID placeholder='ID' />
      <br />
      <PW placeholder='Password' />
      <br />
      <br />
      <Btn>Log In</Btn>
      <br />
      <Line>--------------------------------------</Line>
      <br />
      <Btn>Create an Account</Btn>
    </Div>
    </>
  );
}
