import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Challenge from './pages/Challenge.jsx';
import Crew from './pages/Crew.jsx';
import Recommendation from './pages/Recommendation.jsx';
import Mypage from './pages/Mypage.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
