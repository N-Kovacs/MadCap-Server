import { useState, useEffect } from "react";
import Box from "@mui/material/Box";


export default function Round(props) {
  // const [round, setRound] = useState(1);
  const [roundTimer, setRoundTimer] = useState(3);
  const [fontSize, setFontSize] = useState('10px');

  // setInterval to setTimeout... clearInterval to clearTimeout

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setFontSize('25px');
      }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer =
      roundTimer > 0 && setTimeout(() => setRoundTimer((prev) => prev - 1), 850);
    if (roundTimer === 0) {
      props.getNextSubcategory();
      props.clearBoard();
      props.setStatePhase("game");
    }
    return () => clearTimeout(timer);
  }, [roundTimer]);

  return (
    <Box className="round-box" sx={{ fontSize: fontSize, transition: 'font-size 250ms' }}>
      {props.round !== props.gameData.rounds ?
        <div>
          <h1>Round</h1>
          <h1>{props.round}/{props.gameData.rounds}</h1>
        </div>
        :
        <div className="round-box" >
          {props.gameData.rounds !== 1 ? <h1 style={{textAlign: 'center'}}>Final Round!</h1> : 
          <h1 style={{textAlign: 'center'}}>One Round!</h1>}
        </div>
      }
    </Box>
  );
}