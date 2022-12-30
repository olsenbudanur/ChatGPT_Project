import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as S from "../Styles";


const screenshot1 = require('../../assets/inputEmail1.png')
const screenshot2 = require('../../assets/pickDepth2.png')
const screenshot3 = require('../../assets/promptInfo3.png')

const screenshots = [screenshot1, screenshot2, screenshot3]

const steps = [
  {label: 'Log in with email',
    description: 'Log in with email and provide page/word count requirement.'

  },
  {
    label: 'Basic info',
    description: `Fill out some basic information about you. For example, what colleges are you applying to?`,
  },
  {
    label: 'Prompt info',
    description:
      'Fill out some questions so the AI can better understand your prompt. For example, what is the mood of your essay? What important experience would you like to write about?',
  },
  {
    label: 'AI writes essay!',
    description: `Sit tight and wait for the AI to generate a custom essay for your college application!`,
  },
];

export default function Steps() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
  <S.stepsWrapper>
    <Box sx={{ maxWidth: 800, minHeight: 400}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
                <StepLabel>
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
            
                    <div>
                      { index != steps.length - 1 ? <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Continue
                      </Button> : null}
                      { index != 0 ?
                      <Button
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button> : null}
                    </div>

                  </Box>
                </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  <div style={{
    display:"grid",
    placeItems: "center"
  }}>
  {<S.photo src={String(screenshots[activeStep])} />}
  </div>
  </S.stepsWrapper>
  
    
  );
}

