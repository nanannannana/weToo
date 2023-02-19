import axios from 'axios';
//액션 타입 정의
const JOIN = 'register/JOIN';

//액션 함수
export function registerUser(submitData) {
  const request = axios
    .post('http://localhost:8000/auth/signup', submitData)
    .then((response) => response.data);
  return {
    type: JOIN,
    payload: request,
  };
}

//리듀서
export default function register(state = {}, action) {
  switch (action.type) {
    case JOIN:
      console.log('회원가입');
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
