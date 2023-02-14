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
border: 1px solid #D8D8D8;
margin: 5px;
::placeholder{
  font-size: 3px;
}
`;
const City = styled.input`
width: 62%;
height: 3%;
padding: 10px;
border: 1px solid #D8D8D8;
::placeholder{
  font-size: 3px;
}
`;
const Joinbtn = styled.button`
width: 69%;
height: 8%;
margin: 50px;
border: 1px solid #D8D8D8;
cursor: pointer;
`;

export default function JoinBox() {
  return (
    <>
    <Div>
      <Logo onClick={() => window.open('/', '_self')}>WeTo</Logo>
      <ID placeholder='ID' />
      <br />
      <PW placeholder='Password' />
      <br />
      <City placeholder='City' />
      <br />
      <Joinbtn>Create an Account</Joinbtn>
    </Div>
    </>
  );
}
