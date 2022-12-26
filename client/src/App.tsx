import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestingPage from "./pages/TestingPage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
	return (
		<Router>
			<Navbar></Navbar>
			<Routes>
				<Route path="/test" element={<Home />} />
				<Route path="/" element={<TestingPage />} />
			</Routes>
			<Footer></Footer>
		</Router>
	);
}

export default App;
