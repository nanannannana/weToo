import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Challenge from './pages/Challenge.jsx';
import Crew from './pages/Crew.jsx';
import Recommendation from './pages/Recommendation.jsx';
import Mypage from './pages/Mypage.jsx';
import Login from './pages/Login.jsx';
import Join from './pages/Join.jsx';
import ChatPage from './TEST/ChatPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
