const initState = {
  challenge: [
    {
      name: '아침 운동하기 Challenge',
      price: 1000,
      buyer_tel: '010-0000-0000',
    },
    {
      name: '저녁 운동하기 Challenge',
      price: 1000,
      buyer_tel: '010-0000-0000',
    },
    {
      name: '5km 달리기 Challenge',
      price: 1000,
      buyer_tel: '010-0000-0000',
    },
    {
      name: '1시간 운동하기 Challenge',
      price: 1000,
      buyer_tel: '010-0000-0000',
    },
  ],
  modal: false,
  infoShow: false,
};

const INFO = 'challenge/INFO';
const MODAL = 'challenge/MODAL';
const INFOSHOW = 'challenge/INFOSHOW';

export const info = () => ({ type: INFO });
export const modal = (show) => ({ type: MODAL, payload: show });
export const infoshow = (show) => ({ type: INFOSHOW, payload: show });

export default function challenge(state = initState, action) {
  switch (action.type) {
    case INFO:
      return state;
    case MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case INFOSHOW:
      return {
        ...state,
        infoShow: action.payload,
      };
    default:
      return state;
  }
}
