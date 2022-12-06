import Box from "@mui/material/Box";
import { useState, useEffect, Fragment } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import useSound from "use-sound"

import tick1 from "./tick_1.wav"
// import tick2 from "./tick_2.wav"

// import timer from "./timer.mp3"

export default function Clock(props) {

  const seconds = props.gameData.timer;
  const [gameTimer, setGameTimer] = useState(seconds);
  const [color, setColor] = useState('none');
  const [fontSize, setFontSize] = useState('40px');
  const [playSound1] = useSound(tick1)
  const [playSound2] = useSound(tick1)

  const colors = [
    '#FFA1A1',
    '#FFD59E',
    '#F9FFA4',
    '#B4FF9F',
    '#C8FFD4',
    '#B8E8FC',
    '#B1AFFF'
  ];

<<<<<<< HEAD
  const tick1 = new Audio("./tick_1.wav");
  tick1.type = "audio/wav";
  const tick2 = new Audio("./tick_2.wav");
  tick2.type = "audio/wav";
  const alarm = new Audio("./alarm.wav");
  alarm.type = "audio/wav";
  tick1.loop = false;
  tick2.loop = false;
=======
  // const tick1 = new Audio("./tick_1.wav");
  // const tick2 = new Audio("./tick_2.wav");
  const alarm = new Audio("./alarm.wav");
  // tick1.loop = false;
  // tick2.loop = false;
>>>>>>> upstream/use-sound

  useEffect(() => {
    if (gameTimer % 2 === 0) playSound1()
    if (gameTimer % 2 !== 0) playSound2()

    const timer =
      gameTimer > 0 && setTimeout(() => {
        setGameTimer(prev => (prev - 1));
      }, 1000);

    if (gameTimer === 0) {
      // tick1.pause();
      // tick2.pause();
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
            setColor(colors[remainingTime % colors.length]);
            if (remainingTime === 0) {
              alarm.play();
              props.setStatePhase("vote");
            }

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