import { useState, useEffect } from "react";
import Box from "@mui/material/Box";


export default function Round(props) {
  const [roundTimer, setRoundTimer] = useState(4);
  // const [startTimer, setStartTimer] = useState(3);
  const [display, setDisplay] = useState("none");
  const [fontSize, setFontSize] = useState('10px');

  // setInterval to setTimeout... clearInterval to clearTimeout

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setDisplay("initial");
      }, 1550);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setFontSize('29px');
      }, 1575);
    return () => clearTimeout(timer);
  }, [fontSize]);

  useEffect(() => {
    const timer =
      roundTimer > 0 && setTimeout(() => setRoundTimer((prev) => prev - 1), 1100);
    if (roundTimer === 0) {
      props.getNextSubcategory();
      props.clearBoard();
      props.setStatePhase("game");
    }
    return () => clearTimeout(timer);
  }, [roundTimer]);


  // useEffect(() => {
  //   const timer =
  //     startTimer > 0 && setInterval(() => setStartTimer((prev) => prev - 1), 1850);
  //   if (props.phase === "round" && startTimer === 0) {
  //     props.setStatePhase("game");
  //   }
  //   return () => clearTimeout(timer);
  // }, [startTimer]);



  return (

    <Box className="round-box"
      sx={{
        display: display,
        fontSize: fontSize, transition: 'font-size 250ms'
      }}>

      {props.round !== props.gameData.rounds
        ?
        <div>
          <h1>Round</h1>
          <h1>{props.round}/{props.gameData.rounds}</h1>
        </div>
        :
        <div className="round-box">
          {props.gameData.rounds !== 1 ? <h1 style={{ textAlign: 'center' }}>Final Round!</h1> :
            <h1 style={{ textAlign: 'center' }}>One Round!</h1>}
        </div>
      }

      {/* {props.phase === "start" && <h1>Start!</h1>} */}
    </Box>

  );
}