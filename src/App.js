import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Challenge from "./pages/Challenge";
import Mate from "./pages/Mate";
import Recommendation from "./pages/Recommendation";
import Mypage from "./pages/Mypage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/mate" element={<Mate />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
