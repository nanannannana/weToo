// const initState = {
//   img: false,
// };

// const UPLOAD = 'crew/UPLOAD';

// export const upload = (show) => ({ type: UPLOAD, payload: show });

// export default function crew(state = initState, action) {
//   switch (action.type) {
//     case UPLOAD:
//       return {
//         ...state,
//         upload: action.payload,
//       };
//   }
// }

// const initState = {
//   crewdata: [
//     {
//       id: 1,
//       title: 'YOGACREW',
//       info: '오늘 하루도 요가와 함께해요~:)',
//       img: 'yogacrew.png',
//     },
//     {
//       id: 2,
//       title: 'CYCLECREW',
//       info: '싸이클 좋아하세요?',
//       img: 'cyclecrew.png',
//     },
//     {
//       id: 3,
//       title: 'RUNCREW',
//       info: '함께 달려요!',
//       img: 'runcrew.png',
//     },
//     {
//       id: 4,
//       title: 'SWIMSWIM',
//       info: '오늘도 스윔스윔!!',
//       img: 'swimcrew.png',
//     },
//   ],
// };

// const UPLOAD = 'crew/UPLOAD';

// export const upload = (data) => ({ type: UPLOAD, payload: { data } });

// export default function crew(state = initState, action) {
//   switch (action.type) {
//     case UPLOAD:
//       return {
//         ...state,
//         upload: action.payload.data,
//       };
//     default:
//       return state;
//   }
// }
