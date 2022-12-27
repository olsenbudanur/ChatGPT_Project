import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestingPage from "./pages/A4";
import Navbar from "./components/Navbar/Navbar";
import Prompt from "./pages/Prompt";
import Footer from "./components/Footer/Footer";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/test" element={<TestingPage />} />
				<Route path="/prompt" element={<Prompt />} />
			</Routes>
		</Router>
	);
}

export default App;
