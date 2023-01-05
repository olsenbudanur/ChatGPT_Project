import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";
import Button from "@mui/material/Button";

import * as S from "./TestingPage.styles";
import { CircularProgress } from "@mui/material";

function TestingPage() {
	const [ChatGPTMessage, setChatGPTMessage] = useState("");
	const [value, setValue] = useState("");
	const [essay, setEssay] = useState("");
	const [loading, setLoading] = useState("none");
	const [copy, setCopy] = useState(true);
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	// console.log(location.state);
	//
	// If not logged in..
	React.useEffect(() => {
		if (!currentUser) {
			navigate("/");
		}
	}, []);

	async function submit() {
		//
		// Kill all other runs that might be happening.
		var highestTimeoutId = setTimeout(";");
		for (var i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}

		setLoading("flex");

		setValue("Response is loading.");

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Origin", "http://localhost:3000");

		// var raw = JSON.stringify({
		// 	prompt: ChatGPTMessage,
		// });

		var raw = JSON.stringify(location.state);

		var requestOptions: RequestInit = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
			mode: "cors",
		};
		let index = 0;
		fetch("http://localhost:8080/college-essay", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setLoading("none");
				setValue("");

				setEssay(data.body);

				setCopy(false);
				index = -1;

				setInterval(() => {
					if (index < data.body.length) {
						// if (data.body.charAt(index).charCodeAt(0) === 10) {
						//   document.getElementById("test").innerHTML;
						//   index++;
						//   return;
						// }
						setValue(
							(value) =>
								(value +=
									data.body.charAt(index))
						);
						index++;
					}
				}, 6);
			})
			.catch((error) => {
				console.log("error", error);
				setValue("ERROR: " + error.toString());
			});
	}

	return (
		<S.OuterLayer className="TestingPage">
			<S.ButtonsWrapper>
				<Button
					style={{ marginTop: "10px" }}
					variant="contained"
					onClick={submit}
				>
					Start Writing!
				</Button>

				<Button
					disabled={copy}
					color="info"
					style={{ marginTop: "10px" }}
					onClick={() => {
						navigator.clipboard.writeText(essay);
					}}
					variant="contained"
				>
					Copy to clipboard
				</Button>
			</S.ButtonsWrapper>

			<br></br>
			<S.Paper>
				<S.EssayTitle>College Essay</S.EssayTitle>
				<S.EssayText>
					<S.LoadingWrapper disp={loading}>
						<h1>Loading</h1>
						<CircularProgress></CircularProgress>
					</S.LoadingWrapper>
					{value.split("").map((c) => {
						if (c.charCodeAt(0) === 10) {
							return <br />;
						} else {
							return c;
						}
					})}
				</S.EssayText>
			</S.Paper>
		</S.OuterLayer>
	);
}

export default TestingPage;
