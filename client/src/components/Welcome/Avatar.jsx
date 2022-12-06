import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

const images = [
  {
    label: '1',
    imgPath: './avatars/avatar-1.png',
    // color: '#8a2eff'
    color: "purple"
  },
  {
    label: '2',
    imgPath: './avatars/avatar-2.png',
    // color: '#4bab2f',
    color: "green"
  },
  {
    label: '3',
    imgPath: './avatars/avatar-3.png',
    // color: '#72d695',
    color: "teal"
  },
  {
    label: '4',
    imgPath: './avatars/avatar-4.png',
    // color: '#FDBE00',
    color: "darkgoldenrod"
  },
  {
    label: '5',
    imgPath: './avatars/avatar-5.png',
    // color: '#52b5ff',
    color: "blue"
  },
  {
    label: '6',
    imgPath: './avatars/avatar-6.png',
    // color: '#c61234',
    color: "red"
  },
  {
    label: '7',
    imgPath: './avatars/avatar-7.png',
    // color: '#621dff',
    color: "slateblue"
  },
  {
    label: '8',
    imgPath: './avatars/avatar-8.png',
    // color: '#fff600',
    color: "yellow"
  },
  {
    label: '9',
    imgPath: './avatars/avatar-9.png',
    // color: '#008bff',
    color: "lightcyan"
  },
  {
    label: '10',
    imgPath: './avatars/avatar-10.png',
    // color: '#ff8638',
    color: "orange"
  },
  {
    label: '11',
    imgPath: './avatars/avatar-11.png',
    // color: '#99ffd8',
    color: "cornflowerblue"
  },
  {
    label: '12',
    imgPath: './avatars/avatar-12.png',
    // color: '#e14400',
    color: "darkorange"
  },
  {
    label: '13',
    imgPath: './avatars/avatar-13.png',
    // color: '#ffbb87',
    color: "plum"
  },
  {
    label: '14',
    imgPath: './avatars/avatar-14.png',
    // color: '#ff64aa',
    color: "orchid"
  }
];

export default function ActionAvatar(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(Math.floor(Math.random() * images.length));
  const maxSteps = images.length;

  useEffect(() => {
    props.setAvatar(images[activeStep].imgPath)
    props.setColor(images[activeStep].color)
  }, [activeStep])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400, maxHeight: 210, flexGrow: 1 }}>
      <div className="tri-avatar">
        <img alt="tri" src="./tri-border.png"
        />
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label} style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    overflow: 'hidden',
                    maxWidth: 120,
                    width: '100%',
                    pt: '10px'
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
      </div>
      <MobileStepper
        sx={{
          justifyContent: 'center',
          backgroundColor: '#edf1ff'
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}