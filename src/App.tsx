import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./Screens/LandingPage";
import {Login} from "./Screens/Login";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
