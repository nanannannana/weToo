// 초기 상태값 지정
const initState = {
  crewInfo: [],
};

// 액션명 지정
const CREWSHOW = 'crew/CREWSHOW';

// 액션 함수 지정
export const crewShow = (data) => ({ type: CREWSHOW, payload: data });

// 리덕스 지정
export default function crew(state = initState, action) {
  switch (action.type) {
    case CREWSHOW:
      return {
        ...state,
        crewInfo: action.payload,
      };
    default:
      return state;
  }
}
