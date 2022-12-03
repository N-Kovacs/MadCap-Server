import { Fragment } from 'react';
import Button from '@mui/material/Button';
import { lightGreen } from '@mui/material/colors';
import { Box } from '@mui/system';
import { forwardRef } from 'react';

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
          fontSize: '21px',
          '&.Mui-disabled': {
            bgcolor: lightGreen[100],
            color:lightGreen[700],
          }
        }}
        disabled={props.disabled}
        >{props.message}
        </Button>
  );
};