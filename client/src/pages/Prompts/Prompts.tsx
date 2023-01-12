import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MuiAlert from "@mui/material/Alert";
import { redirect } from "react-router-dom";
import * as S from "./Prompts.styles";
import { useAuth } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const steps = ["Pick Depth", "Give Prompt Information", "AI Writes Essay"];

export default function Prompts() {
	const [activeStep, setActiveStep] = React.useState(0);
	const [collegeName, setCollegeName] = React.useState("");
	const [prompt, setPrompt] = React.useState("");
	const [promptTopic, setPromptTopic] = React.useState("");
	const [mood, setMood] = React.useState("");
	const [pageCount, setPageCount] = React.useState("2");
	const [writtenEssay, setWrittenEssay] = React.useState("");
	const [hobby, setHobby] = React.useState("");
	const [hobbyTime, setHobbyTime] = React.useState("");
	const [hobbyFav, setHobbyFav] = React.useState("");
	const [hobbyLearned, setHobbyLearned] = React.useState("");
	const [hobbyLeadership, setHobbyLeadership] = React.useState("");
	const [event, setEvent] = React.useState("");
	const [childhood, setChildhood] = React.useState("");
	const [anything, setAnything] = React.useState("");

	const { currentUser }: any = useAuth();
	const [error, setError] = React.useState(false);
	const navigate = useNavigate();

	const toPayment = () => {
		navigate("/payment", {
			state: {
				collegeName: collegeName,
				prompt: prompt,
				promptTopic: promptTopic,
				mood: mood,
				pageCount: pageCount,
				writtenEssay: writtenEssay,
				hobby: hobby,
				hobbyTime: hobbyTime,
				hobbyFav: hobbyFav,
				hobbyLearned: hobbyLearned,
				hobbyLeadership: hobbyLeadership,
				event: event,
				childhood: childhood,
				anything: anything,
			},
		});
	};

	const handleCountChange = (event: any) => {
		setPageCount(event.target.value);
	};

	//
	// If not logged in..
	React.useEffect(() => {
		if (!currentUser) {
			navigate("/");
		}
	}, []);

	const handleNext = () => {
		if (
			(collegeName === "" && activeStep === 0) ||
			(prompt === "" && activeStep === 0) ||
			(prompt === "Custom Prompt" && promptTopic === "") ||
			(mood === "" && activeStep === 0) ||
			(hobby === "" && activeStep === 1) ||
			(hobbyTime === "" && activeStep === 1) ||
			(hobbyFav === "" && activeStep === 1) ||
			(event === "" && activeStep === 1) ||
			(writtenEssay === "" && activeStep === 1) ||
			(hobbyLearned === "" && activeStep === 1) ||
			(hobbyLeadership === "" && activeStep === 1) ||
			(childhood === "" && activeStep === 1) ||
			(anything === "" && activeStep === 1)
		) {
			setError(true);
			return;
		}

		if (activeStep == steps.length - 2) {
			toPayment();
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handlePromptChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPrompt((event.target as HTMLInputElement).value);
	};

	return (
		<S.Sec2Wrapper>
			<S.StepperWrapper>
				{currentUser && (
					<Box sx={{ width: "100%" }}>
						<Stepper activeStep={activeStep}>
							{steps.map((label) => {
								const stepProps: {
									completed?: boolean;
								} = {};
								const labelProps: {
									optional?: React.ReactNode;
								} = {};

								return (
									<Step
										key={label}
										{...stepProps}
									>
										<StepLabel
											{...labelProps}
										>
											{label}
										</StepLabel>
									</Step>
								);
							})}
						</Stepper>
						{activeStep === steps.length || (
							<React.Fragment>
								{activeStep === 0 && (
									<S.FormWrapper>
										<TextField
											required
											label="College Name"
											value={
												collegeName
											}
											onChange={(
												e
											) => {
												setCollegeName(
													e
														.target
														.value
												);
											}}
										/>
										<FormControl>
											<FormLabel>
												Essay
												Type
											</FormLabel>
											<RadioGroup
												value={
													prompt
												}
												onChange={
													handlePromptChange
												}
											>
												<FormControlLabel
													value="Personal Statement"
													control={
														<Radio />
													}
													label="Personal Statement"
												/>
												<FormControlLabel
													value="Custom Prompt"
													control={
														<Radio />
													}
													label="Custom Prompt"
												/>
											</RadioGroup>
										</FormControl>

										{prompt ===
											"Custom Prompt" && (
											<TextField
												required
												label="If you have a prompt, write it here"
												value={
													promptTopic
												}
												onChange={(
													e
												) => {
													setPromptTopic(
														e
															.target
															.value
													);
												}}
											/>
										)}
										<FormControl
											fullWidth
										>
											<InputLabel id="demo-simple-select-helper-label">
												Mood
											</InputLabel>
											<Select
												value={
													mood
												}
												label="Mood"
												onChange={(
													event
												) => {
													setMood(
														event
															.target
															.value
													);
												}}
											>
												<MenuItem value="Cheerful">
													Cheerful
												</MenuItem>
												<MenuItem value="Reflective">
													Reflective
												</MenuItem>
												<MenuItem value="Humorous">
													Humorous
												</MenuItem>
												<MenuItem value="Melancholy">
													Melancholy
												</MenuItem>
												<MenuItem value="Melancholy">
													Lighthearted
												</MenuItem>
											</Select>
										</FormControl>
										<S.PagesWrapper>
											<FormControl
												sx={{
													marginTop: 2,
												}}
											>
												<InputLabel>
													Page
													Count
												</InputLabel>
												<Select
													value={
														pageCount
													}
													label="Page Count"
													onChange={
														handleCountChange
													}
													fullWidth
												>
													<MenuItem
														value={
															1
														}
													>
														1
													</MenuItem>
													<MenuItem
														value={
															2
														}
													>
														2
													</MenuItem>
													<MenuItem
														value={
															3
														}
													>
														3
													</MenuItem>
													<MenuItem
														value={
															4
														}
													>
														4
													</MenuItem>
												</Select>
											</FormControl>

											<S.WordCount>
												{Number(
													pageCount
												) *
													130}{" "}
												words
											</S.WordCount>
										</S.PagesWrapper>
									</S.FormWrapper>
								)}

								{activeStep === 1 && (
									<S.FormWrapper>
										Why are you applying
										to this college?
										<TextField
											multiline
											value={
												writtenEssay
											}
											onChange={(
												e
											) => {
												setWrittenEssay(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
										What major are you
										interested in?
										<TextField
											required
											value={hobby}
											multiline
											onChange={(
												e
											) => {
												setHobby(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
										What are your
										hobbies? Seperate by
										commas.
										<TextField
											required
											multiline
											value={
												hobbyTime
											}
											onChange={(
												e
											) => {
												setHobbyTime(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
										What are obstacles
										that you overcame?
										Seperate by commas.
										<TextField
											required
											value={
												hobbyFav
											}
											multiline
											onChange={(
												e
											) => {
												setHobbyFav(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
										Who do you admire?
										<TextField
											value={
												hobbyLearned
											}
											multiline
											onChange={(
												e
											) => {
												setHobbyLearned(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
										What do you want to
										do in college?
										<TextField
											value={
												hobbyLeadership
											}
											multiline
											onChange={(
												e
											) => {
												setHobbyLeadership(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
										What is the best
										problem you solved?
										<TextField
											required
											value={event}
											multiline
											onChange={(
												e
											) => {
												setEvent(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
										What captivates you?
										<TextField
											value={
												childhood
											}
											multiline
											onChange={(
												e
											) => {
												setChildhood(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
										Describe yourself in
										three words.
										Seperate them with
										commas.
										<TextField
											multiline
											value={
												anything
											}
											onChange={(
												e
											) => {
												setAnything(
													e
														.target
														.value
												);
											}}
											inputProps={{
												maxLength: 400,
											}}
										/>
									</S.FormWrapper>
								)}
								<Box
									sx={{
										display: "flex",
										flexDirection:
											"row",
										pt: 2,
									}}
								>
									<Button
										color="inherit"
										disabled={
											activeStep ===
											0
										}
										onClick={handleBack}
										sx={{ mr: 1 }}
									>
										Back
									</Button>
									<Box
										sx={{
											flex: "1 1 auto",
										}}
									/>

									<Button
										onClick={handleNext}
									>
										{activeStep ===
										steps.length - 1
											? "Finish"
											: "Next"}
									</Button>
								</Box>
								{error && (
									<Snackbar
										anchorOrigin={{
											vertical: "bottom",
											horizontal:
												"center",
										}}
										open={error}
										onClose={() => {
											setError(
												false
											);
										}}
										message="Please fill out the entire form"
									>
										<MuiAlert severity="error">
											Please fill
											out the entire
											form
										</MuiAlert>
									</Snackbar>
								)}
							</React.Fragment>
						)}
					</Box>
				)}
				{!currentUser}
			</S.StepperWrapper>
		</S.Sec2Wrapper>
	);
}
