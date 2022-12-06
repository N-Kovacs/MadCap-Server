import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';


export default function Vote (props) {
  const [voteTimer, setVoteTimer] = useState(5);
  const [display, setDisplay] = useState('none');

  // setInterval to setTimeout... clearInterval to clearTimeout

  useEffect(() => {
    const timer =
      setTimeout(() => {
       setDisplay('initial');
      }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer =
      voteTimer > 0 && setTimeout(() => setVoteTimer(prev => (prev - 1)), 800);
    if (voteTimer === 0) props.setStatePhase("results");
    return () => clearTimeout(timer);
  }, [voteTimer]);

  return (
    <Box className="vote-box">
      <h1 style={{display: display, fontSize: "35px" }}>Vote!</h1>
    </Box>
  )
}