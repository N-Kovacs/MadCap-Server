import Box from "@mui/material/Box";
import { useState, useEffect, Fragment } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Clock(props) {

  const seconds = props.gameData.timer;
  const [gameTimer, setGameTimer] = useState(seconds);
  const [color, setColor] = useState('none');
  const [fontSize, setFontSize] = useState('40px');

  const colors = [
    '#FFA1A1',
    '#FFD59E',
    '#F9FFA4',
    '#B4FF9F',
    '#C8FFD4',
    '#B8E8FC',
    '#B1AFFF'
  ];

  // useEffect(() => {
  //   const timer =
  //     gameTimer > 0 && setTimeout(() => {
  //       setGameTimer(prev => (prev - 1));
  //       // setColor(colors[gameTimer % colors.length]);
  //     }, 1000);

  //   if (gameTimer === 0) props.setStatePhase("vote");
  //   return () => clearTimeout(timer);

  // }, [gameTimer]);

  return (
    <Fragment>
      <Box className="game-clock"
        sx={{
          // transition: 'background-color 90ms',
        }}
      >
        <CountdownCircleTimer className="circle-timer"
          isPlaying
          duration={seconds}
          colors={[...colors]}
          colorsTime={[seconds, 10, 8, 7, 5, 2, 0]}
        >
          {({ remainingTime }) => {

            setColor(colors[remainingTime % colors.length]);
            if (remainingTime === 0) props.setStatePhase("vote");

            return (<div className="game-clock-inner">
              <h1 className="game-clock-counter"
                style={{
                  fontSize: fontSize,
                  color: color,
                  // transition: 'font-size 150ms',
                  width: 'fit-content',
                  textAlign: 'center'
                }}
              >
                {remainingTime}
              </h1>
            </div>
            );
          }}
        </CountdownCircleTimer>
      </Box>
    </Fragment>
  );
}