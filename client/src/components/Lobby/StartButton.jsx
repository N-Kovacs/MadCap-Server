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
        width: props.disabled ? '100%' : '93%',
          height: 65,
          fontSize: '19px',
          '&.Mui-disabled': {
           bgcolor: '#29722c4a',
           color: '#93ac94'
          }
        }}
        disabled={props.disabled}
        >{props.children}
        </Button>
  );
};