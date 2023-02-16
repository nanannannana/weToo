import axios from 'axios';

const JOIN = 'register/JOIN';

export function join(submitData) {
  const request = axios
    .post('/users/join', submitData)
    .then((response) => response.data);

  return {
    type: JOIN,
    payload: request,
  };
}

export default function register(state = {}, action) {
  switch (action.type) {
    case JOIN:
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
