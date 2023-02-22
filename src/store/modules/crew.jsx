// 초기 상태값 지정
const initState = {
  crewInfo: [],
  infoShow: false,
  crewDetail: [],
  delete: false,
  crewMain: false,
};

// 액션명 지정
const CREWSHOW = 'crew/CREWSHOW';
const INFOSHOW = 'crew/INFOSHOW';
const DETAILSHOW = 'crew/DETAILSHOW';
const CREWDEL = 'crew/CREWDEL';
const CREWMAIN = 'crew/CREWMAIN';

// 액션 함수 지정
export const crewShow = (data) => ({ type: CREWSHOW, payload: data });
export const infoShow = (show) => ({ type: INFOSHOW, payload: show });
export const detailShow = (data) => ({ type: DETAILSHOW, payload: data });
export const crewDel = (del) => ({ type: CREWDEL, payload: del });
export const crewMain = (main) => ({ type: CREWMAIN, payload: main });

// 리덕스 지정
export default function crew(state = initState, action) {
  switch (action.type) {
    case CREWSHOW:
      return {
        ...state,
        crewInfo: action.payload,
      };
    case INFOSHOW:
      return {
        ...state,
        infoShow: action.payload,
      };
    case DETAILSHOW:
      return {
        ...state,
        crewDetail: action.payload,
      };
    case CREWDEL:
      return {
        ...state,
        crewDel: action.payload,
      };
    case CREWMAIN:
      console.log(state.crewInfo);
      console.log(action.payload);
      return {
        ...state,
        crewInfo: [...state.crewInfo, action.payload],
      };
    default:
      return state;
  }
}
