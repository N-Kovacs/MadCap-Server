import { Fragment } from 'react';
import Button from '@mui/material/Button';

export default function ActionButton(props) {

  return (
    <Fragment>
      <Button
        sx={{
          width: '100%',
          maxWidth: '350px',
          height: 65,
          fontSize: 30,
          mb: 3.5,
          backgroundColor: '#153eb3;',
          '&:hover': {
            backgroundColor: '#0d2977',
            color: '#e7e8ff',
          },
        }}
        type="submit"
        onClick={props.onClick}
        variant="contained"
        size="large"
      >{props.children}</Button>
    </Fragment>
  );
}