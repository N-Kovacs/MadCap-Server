import { Fragment } from 'react';
import Button from '@mui/material/Button';
//import { lightGreen } from '@mui/material/colors';


export default function StartButton (props) {

  return (
      <Button
      onClick={props.handleStart}
      variant="contained"
      color="success"
      size="large"
      sx={{
        zIndex: 1000,
        width: props.disabled ? '100%' : '93%',
          height: 65,
          fontSize: '19px',
          backgroundColor: '#153eb3;',
          '&:hover': {
            backgroundColor: '#0d2977',
            color: '#e7e8ff',
          },
          '&.Mui-disabled': {
           bgcolor: '#afc1ff',
           color: '#cbd4f1',
          }
        }}
        disabled={props.disabled}
        >{props.children}
        </Button>
  );
};