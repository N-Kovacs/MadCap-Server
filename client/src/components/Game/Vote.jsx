import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';


export default function Vote (props) {
  const [voteTimer, setVoteTimer] = useState(3);

  // setInterval to setTimeout... clearInterval to clearTimeout

  useEffect(() => {
    const timer =
      voteTimer > 0 && setTimeout(() => setVoteTimer(prev => (prev - 1)), 1000);
    if (voteTimer === 0) props.setStatePhase("results");
    return () => clearTimeout(timer);
  }, [voteTimer]);

  return (
    <Box className="vote-box">
      <h1>Vote!</h1>
    </Box>
  )
}