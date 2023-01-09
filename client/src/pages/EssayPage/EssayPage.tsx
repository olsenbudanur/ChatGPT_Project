import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import * as S from "./EssayPage.styles";
import { CircularProgress } from "@mui/material";

function typingEffect(str: string, setState: (s: string) => void) {
	let i = 0;

	function next() {
		try {
			setState(str.substring(0, i));
			i++;
			if (i <= str.length) {
				setTimeout(next, 7);
			}
		} catch (error) {
			setState("Rate limiting has occured, try in an hour :)");
		}
	}

	setTimeout(next, 7);
}

function EssayPage() {
	const [value, setValue] = useState("");
	const [essay, setEssay] = useState("");
	const [loading, setLoading] = useState("none");
	const [copy, setCopy] = useState(true);
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	//
	// If not logged in..
	React.useEffect(() => {
		if (!currentUser) {
			navigate("/");
		}

		submit();
	}, []);

	async function submit() {
		//
		// Kill all other runs that might be happening.
		const highestTimeoutId = setTimeout(";");
		for (var i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}

		setLoading("flex");

		setValue("Response is loading.");

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Origin", "http://localhost:3000");

		const raw = JSON.stringify({
			...JSON.parse(Cookies.get("state")!),
			email: currentUser.email,
		});

		const requestOptions: RequestInit = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
			mode: "cors",
		};

		fetch("http://localhost:8080/college-essay", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setLoading("none");
				setValue("");

				setEssay(data.body);
				setCopy(false);

				typingEffect(data.body, setValue);
			})
			.catch(() => {
				setValue(
					"Rate limiting has occured, try in an hour :)"
				);
			});
	}

	return (
		<S.OuterLayer className="TestingPage">
			<S.ButtonsWrapper>
				{/* <Button
          style={{ marginTop: "10px" }}
          variant="contained"
          onClick={submit}
        >
          Start Writing!
        </Button> */}

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

export default EssayPage;
