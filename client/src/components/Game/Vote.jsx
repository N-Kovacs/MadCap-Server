import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';


export default function Vote (props) {
  const [voteTimer, setVoteTimer] = useState(4);
  const [display, setDisplay] = useState('none');

  // setInterval to setTimeout... clearInterval to clearTimeout

  useEffect(() => {
    const timer =
      setTimeout(() => {
       setDisplay('initial');
      }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer =
      voteTimer > 0 && setTimeout(() => setVoteTimer(prev => (prev - 1)), 1000);
    if (voteTimer === 0) props.setStatePhase("results");
    return () => clearTimeout(timer);
  }, [voteTimer]);

  return (
    <Box className="vote-box">
      <h1 style={{display: display }}>Vote!</h1>
    </Box>
  )
}