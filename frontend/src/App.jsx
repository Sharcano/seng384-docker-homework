import { Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import PeoplePage from "./pages/PeoplePage";

function App() {
  return (
    <div>
      <nav className="navbar">
        <span className="navbar-brand">Person Management</span>
        <Link to="/">Register</Link>
        <Link to="/people">People</Link>
      </nav>
      <div className="page-container">
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/people" element={<PeoplePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
