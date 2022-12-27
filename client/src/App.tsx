import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestingPage from "./pages/TestingPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestingPage />} />
      </Routes>
      {/* <Footer></Footer> */}
    </Router>
  );
}

export default App;
