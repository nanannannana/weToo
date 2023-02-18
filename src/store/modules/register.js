import axios from 'axios';
//초기값
const initState = {
  id: '',
  pwd: '',
  city: '',
  name: '',
  nickname: '',
};

//액션 타입 정의
const JOIN = 'register/JOIN';

//액션 함수
export function join(payload) {
  const request = axios
    .post('/join', payload)
    .then((response) => console.log(response));

  return {
    type: JOIN,
    payload: request,
  };
}

//리듀서
export default function register(state = { initState }, action) {
  switch (action.type) {
    case JOIN:
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
