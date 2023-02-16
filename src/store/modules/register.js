const JOIN = 'register/JOIN';

export function join(payload) {
  return {
    type: JOIN,
    payload,
  };
}

export default function register(state = {}, action) {
  switch (action.type) {
    case JOIN:
      return console.log('회원가입');
    default:
      return state;
  }
}
