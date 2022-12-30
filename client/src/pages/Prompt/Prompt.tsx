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
import * as S from "./Prompt.styles";
import { useAuth } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const steps = ["Pick Depth", "Give Prompt Information", "AI Writes Essay"];

export default function Prompt() {
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
      (event === "" && activeStep === 1)
    ) {
      setError(true);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt((event.target as HTMLInputElement).value);
  };

  console.log(collegeName, prompt);

  return (
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
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
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
                    value={collegeName}
                    onChange={(e) => {
                      setCollegeName(e.target.value);
                    }}
                  />
                  <FormControl>
                    <FormLabel>Essay Type</FormLabel>
                    <RadioGroup value={prompt} onChange={handlePromptChange}>
                      <FormControlLabel
                        value="Personal Statement"
                        control={<Radio />}
                        label="Personal Statement"
                      />
                      <FormControlLabel
                        value="Custom Prompt"
                        control={<Radio />}
                        label="Custom Prompt"
                      />
                    </RadioGroup>
                  </FormControl>

                  {prompt === "Custom Prompt" && (
                    <TextField
                      required
                      label="If you have a prompt, write it here"
                      value={promptTopic}
                      onChange={(e) => {
                        setPromptTopic(e.target.value);
                      }}
                    />
                  )}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      Mood
                    </InputLabel>
                    <Select
                      value={mood}
                      label="Mood"
                      onChange={(event) => {
                        setMood(event.target.value);
                      }}
                    >
                      <MenuItem value="yarrak">yarrak</MenuItem>
                      <MenuItem value="bussi">bussi</MenuItem>
                      <MenuItem value="hehe xd">hehe xd</MenuItem>
                      <MenuItem value="serious">serious</MenuItem>
                    </Select>
                  </FormControl>
                  <S.PagesWrapper>
                    <FormControl
                      sx={{
                        marginTop: 2,
                      }}
                    >
                      <InputLabel>Page Count</InputLabel>
                      <Select
                        value={pageCount}
                        label="Page Count"
                        onChange={handleCountChange}
                        fullWidth
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                      </Select>
                    </FormControl>

                    <S.WordCount>{Number(pageCount) * 250} words</S.WordCount>
                  </S.PagesWrapper>
                </S.FormWrapper>
              )}

              {activeStep === 1 && (
                <S.FormWrapper>
                  If you already started writing your essay, paste it below and
                  we will use it as a reference (Optional)
                  <TextField
                    multiline
                    value={writtenEssay}
                    onChange={(e) => {
                      setWrittenEssay(e.target.value);
                    }}
                    inputProps={{ maxLength: 400 }}
                  />
                  What is your favorite extracurricular/hobby?
                  <TextField
                    required
                    value={hobby}
                    multiline
                    onChange={(e) => {
                      setHobby(e.target.value);
                    }}
                    inputProps={{ maxLength: 400 }}
                  />
                  When did you start this hobby?
                  <TextField
                    required
                    multiline
                    value={hobbyTime}
                    onChange={(e) => {
                      setHobbyTime(e.target.value);
                    }}
                    inputProps={{ maxLength: 400 }}
                  />
                  What do you like about this hobby?
                  <TextField
                    required
                    value={hobbyFav}
                    multiline
                    onChange={(e) => {
                      setHobbyFav(e.target.value);
                    }}
                    inputProps={{ maxLength: 400 }}
                  />
                  What have you learned from this hobby? (Optional)
                  <TextField
                    value={hobbyLearned}
                    multiline
                    onChange={(e) => {
                      setHobbyLearned(e.target.value);
                    }}
                    inputProps={{ maxLength: 400 }}
                  />
                  Have you had any leadership experiences with this hobby?
                  (Optional)
                  <TextField
                    value={hobbyLeadership}
                    multiline
                    onChange={(e) => {
                      setHobbyLeadership(e.target.value);
                    }}
                    inputProps={{ maxLength: 400 }}
                  />
                  Describe an important event in your life, why you are sharing
                  it
                  <TextField
                    required
                    value={event}
                    multiline
                    onChange={(e) => {
                      setEvent(e.target.value);
                    }}
                    inputProps={{ maxLength: 400 }}
                  />
                  Do you have any challenging childhood experiences you’d like
                  to talk about?(EX: deaths, bullying, etc) (Optional)
                  <TextField
                    value={childhood}
                    multiline
                    onChange={(e) => {
                      setChildhood(e.target.value);
                    }}
                    inputProps={{ maxLength: 400 }}
                  />
                  Anything else you would like us to know about you for the
                  essay? (Optional)
                  <TextField
                    multiline
                    value={anything}
                    onChange={(e) => {
                      setAnything(e.target.value);
                    }}
                    inputProps={{ maxLength: 400 }}
                  />
                </S.FormWrapper>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
              {error && (
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  open={error}
                  onClose={() => {
                    setError(false);
                  }}
                  message="Please fill out the entire form"
                >
                  <MuiAlert severity="error">
                    Please fill out the entire form
                  </MuiAlert>
                </Snackbar>
              )}
            </React.Fragment>
          )}
        </Box>
      )}
      {!currentUser}
    </S.StepperWrapper>
  );
}
