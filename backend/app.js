const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require('./models');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
let users = {};
let room = {};
io.on('connection', (socket) => {
  // 채팅방 입장

  socket.on('notice', (data) => {
    console.log('notice1', data);
    users[socket.id] = data.nickName;
    io.to(data.currentCrew.id).emit('notice', {
      type: 'notice',
      chat: data.nickName + '님이 입장하였습니다.',
    });
  });

  socket.on('join', (data) => {
    console.log(data.currentCrew);
    room[socket.id] = data.currentCrew;
    socket.join(data.currentCrew);
  });

  socket.on('joinCrew', (data) => {
    console.log('joinCrew', data);

    io.emit('joinCrew', data);
  });

  console.log('server open ' + socket.id);
  socket.emit('socketID', socket.id);
  socket.on('sendMsg', (data) => {
    data['from'] = socket.id;
    data['User_nickName'] = data.nickName;
    data['isDm'] = false;
    io.to(data.currentCrew.id).emit('newMsg', data);
  });
  // 채팅방 퇴장
  socket.on('roomOut', () => {
    console.log('roomOut');
    socket.leave(room[socket.id]);
    io.to(room[socket.id]).emit('notice', {
      type: 'notice',
      chat: users[socket.id] + '님이 대화창을 나갔습니다.',
    });
  });
  socket.on('disconnect', () => {
    console.log('disconnect');
    io.to(room[socket.id]).emit('notice', {
      type: 'notice',
      chat: users[socket.id] + '님이 대화창을 나갔습니다.',
    });
    // delete users[socket.id];
    // io.emit('users', users);
  });
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결됨.');
  })
  .catch((err) => {
    console.error(err);
  });
app.use(morgan('dev')); // 로그
// app.use(express.static(path.join(__dirname, "public"))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    method: ['GET', 'POST', 'DELETE', 'PATCH'],
  })
);

const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');
const mateRouter = require('./routes/mate');
const challengeRouter = require('./routes/challenge');
const weatherRouter = require('./routes/weather');
const mypageRouter = require('./routes/mypage');

app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use('/mate', mateRouter);
app.use('/challenge', challengeRouter);
app.use('/weather', weatherRouter);
app.use('/mypage', mypageRouter);
// 서버 실행
// app.listen(app.get("port"), () => {
//   console.log(app.get("port"), "번 포트에서 대기 중");
// });
http.listen(process.env.PORT, () =>
  console.log(`${process.env.PORT} server running`)
);
