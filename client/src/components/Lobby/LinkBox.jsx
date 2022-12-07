import { useLoaderData, useParams } from 'react-router-dom';
import { useState, Fragment } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField, Snackbar } from '@mui/material';

export default function LinkBox(props) {
  const { full_url } = useLoaderData();
  const { game_url } = useParams();
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    setOpen(true);
    navigator.clipboard.writeText(full_url);
  };

  const CopyButton = () => (
    <Button text="copy" size="small"
      variant="outlined"
      sx={{ height: 30, pt: '6px' }}
    >
      copy
    </Button>
  );
  
  return (
    <Fragment>
      <Box
        component="form"
        sx={{
          width: '100%',
          pl: '4px',
          '& > :not(style)': { m: 1, width: '93%' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          InputProps={{ endAdornment: <CopyButton /> }}
          value={game_url}
          onClick={handleCopy}
          disabled
        />
      </Box>
      <Snackbar
        message="Copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={100}
        onChange={() => setOpen(false)}
        open={open}
        sx={{'& .MuiPaper-root': {display: 'flex',
    justifyContent: 'center'}}}
      />
    </Fragment>
  );
}