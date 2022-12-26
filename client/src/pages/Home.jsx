import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import Footer from "../components/footer/Footer";

function Home() {
	const [isOpen, setIsOpen] = useState(true);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const mystyle = {
		background: "none",
	};

	return (
		<div style={mystyle}>
			{/* <SideBar isOpen={isOpen} toggle={toggle} /> */}
			Home page testing
		</div>
	);
}

export default Home;
