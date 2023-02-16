const JOIN = 'register/JOIN';

export function join(payload) {
  return {
    type: JOIN,
    payload,
  };
}

export default function todo(action) {
  switch (action.type) {
    case JOIN:
      return console.log('join');
  }
}
