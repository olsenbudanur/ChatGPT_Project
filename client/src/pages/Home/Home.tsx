import React, { useState } from "react";
import BasicModal from "../LoadingModal/LoadingModal";
import TextField from "@mui/material/TextField";
import { Navbar } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import * as S from "./Home.styles";
import { useNavigate } from "react-router-dom";
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../components/Context/AuthContext";
import { Alert } from "@mui/material";
import Steps from "../../components/HomeSections/Steps";


function Home() {
	const [pageCount, setPageCount] = useState("2");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState<boolean>(false);
	const [emailExists, setEmailExists] = useState<boolean>(false);
	const { signUp, linkSignIn, currentUser }: any = useAuth();

	const navigate = useNavigate();

	const navigateToPrompt = async () => {
		//
		// If logged in.
		if (currentUser) {
			navigate("/prompt");
		} else {
			//
			// Check if the email has an account already,
			// if it does, handle that case later with
			// email link log in.
			//
			// Otherwise, generate a new password, and create
			// a firebase account with the said password.
			// then auto log in and go to the prompt page.
			//
			// The password is just a filler, and is irrelevent.

			//
			// If this user exists..
			const methods = await fetchSignInMethodsForEmail(auth, email);
			if (methods.length > 0) {
				//
				// Need to send a OTP to the user here.
				alert(
					"This user already exists. Please log in through the link sent to your email"
				);
				setEmailExists(true);
				linkSignIn(email);
			} else {
				// //
				// // Create a user on the fly with just email...
				signUp(email)
					.then((userCredential: any) => {
						// Signed in
						const user = userCredential.user;
						console.log(user);
						navigate("/prompt");
					})
					.catch((error: any) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(errorCode, errorMessage);
					});
			}
		}
	};
	const handleCountChange = (event: any) => {
		setPageCount(event.target.value);
	};

	const handleEmailChange = (event: any) => {
		setEmail(event.target.value);
		//
		// Validate the email using a regular expression
		const emailRegex =
			/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (emailRegex.test(email)) {
			setEmailError(false);
		} else {
			setEmailError(true);
		}
	};

	return (
		<div>
		<S.Wrapper>
			<S.TextLoginWrapper>
				<S.TextWrapper>
					<S.Title>
						Too Tired to Write Your College Essay?
					</S.Title>
					<S.SubTitle>
						Write your essay using the same AI model
						that powers ChatGPT in a matter of minutes!
					</S.SubTitle>

					<S.Title>Try Now!</S.Title>
					<S.SubTitle>
						Enter some basic information, and watch the
						AI write your essay!
					</S.SubTitle>
				</S.TextWrapper>
				<S.LoginWrapper>
					{!currentUser && (
						<S.LoginHeader>Generate your custom essay!</S.LoginHeader>
					)}
					{currentUser && (
						<S.LoginHeader>Generate your custom essay!</S.LoginHeader>
					)}
					{emailExists && (
						<>
							<Alert severity="info">
								This email already exists.
								Please log in through the link
								sent to the email. (Make sure to
								check spam)
							</Alert>
						</>
					)}
					{!currentUser && (
						<TextField
							label="Please Enter your Email"
							fullWidth
							value={email}
							error={emailError}
							onChange={handleEmailChange}
							placeholder="Your Email..."
						/>
					)}
					{currentUser && (
						<S.CurrUser>
							Currently logged in as{" "}
							{currentUser.email}
						</S.CurrUser>
					)}
					{!currentUser && (
						<S.PagesWrapper>
							<FormControl sx={{ marginTop: 2 }}>
								<InputLabel>
									Page Count
								</InputLabel>
								<Select
									value={pageCount}
									label="Page Count"
									onChange={
										handleCountChange
									}
									fullWidth
								>
									<MenuItem value={1}>
										1
									</MenuItem>
									<MenuItem value={2}>
										2
									</MenuItem>
									<MenuItem value={3}>
										3
									</MenuItem>
									<MenuItem value={4}>
										4
									</MenuItem>
									<MenuItem value={5}>
										5
									</MenuItem>
									<MenuItem value={6}>
										6
									</MenuItem>
									<MenuItem value={7}>
										7
									</MenuItem>
									<MenuItem value={8}>
										8
									</MenuItem>
									<MenuItem value={9}>
										9
									</MenuItem>
								</Select>
							</FormControl>

							<S.WordCount>
								{Number(pageCount) * 250} words
							</S.WordCount>
						</S.PagesWrapper>
					)}

					{!currentUser &&(
						<Button
							fullWidth
							sx={{
								marginTop: 2,
								height: 50,
								borderRadius: 10,
							}}
							variant="contained"
							onClick={navigateToPrompt}
							disabled={emailError}
						>
							Submit
						</Button> 
					)}
					{currentUser && (
						<Button
							fullWidth
							sx={{
								marginTop: 2,
								height: 50,
								borderRadius: 10,
							}}
							variant="contained"
							onClick={navigateToPrompt}
							disabled={emailError}
						>
							Continue
						</Button>
					)}
				</S.LoginWrapper>
			</S.TextLoginWrapper>

		</S.Wrapper>
		
		<S.Sec2Wrapper>
			<S.Title>
				How Tutana AI works
			</S.Title>
			<S.TextLoginWrapper>
				<S.stepsWrapper>
					<S.SubTitle>
						Steps
					</S.SubTitle>
					<Steps></Steps>
				</S.stepsWrapper>
			</S.TextLoginWrapper>
			
		</S.Sec2Wrapper>
		</div>

		
	);
}

export default Home;
