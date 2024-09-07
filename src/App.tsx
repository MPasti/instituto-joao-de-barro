import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Screens/LandingPage";
import { Login } from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
