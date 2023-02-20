// import axios from 'axios';

// const JOIN = 'register/JOIN';

// export function registerUser(submitData) {
//   const request = axios
//     .post('http://localhost:8000/auth/signup', submitData)
//     .then((response) => response.data);
//   return {
//     type: JOIN,
//     payload: request,
//   };
// }

// export default function register(state = {}, action) {
//   switch (action.type) {
//     case JOIN:
//       console.log('회원가입');
//       return { ...state, register: action.payload };
//     default:
//       return state;
//   }
// }

const initState = {
  user: {},
};

const JOIN = 'register/join';

export function userJoin(payload) {
  return {
    type: JOIN,
    payload,
  };
}

export default function register(state = initState, action) {
  switch (action.type) {
    case JOIN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
