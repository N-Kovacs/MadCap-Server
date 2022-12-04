import { useState, useEffect } from "react";
import Box from "@mui/material/Box";


export default function Round(props) {
  // const [round, setRound] = useState(1);
  const [roundTimer, setRoundTimer] = useState(4);
  const [fontSize, setFontSize] = useState('10px');

  // setInterval to setTimeout... clearInterval to clearTimeout

  useEffect(() => {
    const timer =
      setTimeout(() => {
       setFontSize('25px')
      }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer =
      roundTimer > 0 && setTimeout(() => setRoundTimer((prev) => prev - 1), 1000);
    if (roundTimer === 0) {
      props.getNextSubcategory();
      props.clearBoard();
      props.setStatePhase("game");
    }
    return () => clearTimeout(timer);
  }, [roundTimer]);

  return (
    <Box className="round-box" sx={{fontSize: fontSize, transition: 'font-size 250ms'}}>
      <h1 >Round</h1>
      <h1>{props.round}/{props.gameData.rounds}</h1>
    </Box>
  );
}
