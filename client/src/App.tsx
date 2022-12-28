import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestingPage from "./pages/A4";
import Navbar from "./components/Navbar/Navbar";
import Prompt from "./pages/Prompt";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./components/Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prompt" element={<TestingPage />} />
          <Route path="/test" element={<Prompt />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
