import React, { useEffect, useRef, useState } from "react";
import * as S from "./TestingPage.styles";

function TestingPage() {
	const [ChatGPTMessage, setChatGPTMessage] = useState<string>("");
	const [value, setValue] = useState<string>("");

	async function submit() {
		//
		// Kill all other runs that might be happening.
		var highestTimeoutId = setTimeout(";");
		for (var i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}

		setValue("Response is loading.");
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Origin", "http://localhost:3000");

		var raw = JSON.stringify({
			prompt: ChatGPTMessage,
		});

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
				console.log(data.body);
				setValue("");
				index = -1;
				let interval = setInterval(() => {
					if (index < data.body.length) {
						setValue(
							(value) =>
								(value +=
									data.body.charAt(index))
						);
						index++;
					} else {
						clearInterval(interval);
					}
				}, 20);
			})
			.catch((error) => {
				console.log("error", error);
				setValue("ERROR: " + error.toString());
			});
	}

	return (
		<S.OuterLayer className="TestingPage">
			<input
				type="textarea"
				name="textValue"
				onChange={(e) => setChatGPTMessage(e.target.value)}
			/>
			<button onClick={submit}>Send the data</button>
			<br></br>
			<S.Paper>
				<S.EssayText>{value}</S.EssayText>
			</S.Paper>
		</S.OuterLayer>
	);
}

export default TestingPage;
