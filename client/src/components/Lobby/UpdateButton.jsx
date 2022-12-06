import { Fragment } from 'react';
import Button from '@mui/material/Button';

export default function UpdateButton(props) {

  return (
    <Fragment>
      <Button onClick={props.handleSet} variant="contained" color="success" size="large"
        sx={{
          width: '93%',
          height: 35,
          fontSize: '20px',
          backgroundColor: '#153eb3;',
          '&:hover': {
            backgroundColor: '#0d2977',
            color: '#e7e8ff',
          }
        }}
      >set</Button>
    </Fragment>
  );
}