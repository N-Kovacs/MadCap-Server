import Box from "@mui/material/Box";
import { useState, useEffect, Fragment } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// import timer from "./timer.mp3"

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

  const tick1 = new Audio("./tick_1.wav");
  const tick2 = new Audio("./tick_2.wav");
  const alarm = new Audio("./alarm.wav");
  tick1.loop = false;
  tick2.loop = false;

  useEffect(() => {
    setColor(colors[gameTimer % colors.length]);
    if (gameTimer % 2 === 0 && !props.muted) tick1.play();
    if (gameTimer % 2 !== 0 && !props.muted) tick2.play();
    
    const timer =
      gameTimer > 0 && setTimeout(() => {
        setGameTimer(prev => (prev - 1));
      }, 1000);

    if (gameTimer === 0) {
      tick1.pause();
      tick2.pause();
      if (!props.muted) alarm.play();
      props.setStatePhase("vote");
    }
    return () => clearTimeout(timer);

  }, [gameTimer]);


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
                
            return (<div className="game-clock-inner">
              <h1 className="game-clock-counter"
                style={{
                  fontSize: fontSize,
                  color: color,
                  transition: 'color 100ms',
                  width: 'fit-content',
                  textAlign: 'center',
                  letterSpacing: '2px'
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