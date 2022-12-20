import { useState } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function HowToPlay() {

  const [visible, setVisible] = useState({
    one: "hidden",
    two: "hidden"
  });
  const [height, setHeight] = useState({
    one: "67px",
    two: "67px"
  });
  const [color, setColor] = useState({
    one: "#1e4ed6",
    two: "#1e4ed6"
  });
  const [size, setSize] = useState({
    one: "28.5px",
    two: "27px"
  });
  const [line, setLine] = useState({
    one: "underline",
    two: "underline"
  });

  const handleClickOne = () => {
    if (visible.one === "visible") {
      setVisible({ ...visible, one: "hidden" });
      setHeight({ ...height, one: "67px" });
      setSize({ ...size, one: "26px" });
      setColor({ ...color, one: "#1e4ed6" });
      setLine({ ...line, one: "underline" });
    } else {
      setVisible({ ...visible, one: "visible" });
      setHeight({ ...height, one: "375px" });
      setSize({ ...size, one: "20px" });
      setColor({ ...color, one: "black" });
      setLine({ ...line, one: "none" });
    }
  };

  const handleClickTwo = () => {
    if (visible.two === "visible") {
      setVisible({ ...visible, two: "hidden" });
      setHeight({ ...height, two: "67px" });
      setSize({ ...size, two: "26px" });
      setColor({ ...color, two: "#1e4ed6" });
      setLine({ ...line, two: "underline" });
    }
    else {
      setVisible({ ...visible, two: "visible" });
      setHeight({ ...height, two: "375px" });
      setSize({ ...size, two: "20px" });
      setColor({ ...color, two: "black" });
      setLine({ ...line, two: "none" });
    }
  };

  return (
    <Container style={{ margin: 0, padding: 0, maxWidth: 500 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '97%',
        height: '100%',
        my: 1
      }}>
      <Box style={{ transition: 'height 450ms ease-out' }}
        sx={{
          visibility: visible.one,
          height: height.one,

          backgroundColor: 'aliceblue',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          mt: 5,
          mb: 2
        }}>
        <div className="how-to how-to-description"
          style={{
            overflow: 'hidden',
            marginLeft: '5px',
            padding: '10px 15px',
            width: '43%', fontSize: "14px"
          }}
        >
          <Button onClick={handleClickOne}
            sx={{
              visibility: 'visible',
              color: color.one,
              fontSize: size.one,
              textDecoration: line.one,
              textUnderlineOffset: '5.5px',
              textDecorationThickness: '8px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: '218px', right: '20px', fontWeight: '800', paddingRight: '0px', paddingLeft: '20px', margin: '0px', marginBottom: '0px',
              '&:hover': {
                backgroundColor: '#cbe2ff6b'
              }
            }}>How To Play</Button>

          <p style={{ marginBottom: '14px' }}
          >Put on your thinking cap!</p>
          <p>Create your own unique word game and invite your friends to the ultimate word rush in a fast-paced, multiplayer environment.</p>
          <p>Beat the clock with as many guesses as possible without overlapping on any available letters.</p>
          <p>Type '/' to chat during game.</p>
          <p><br></br>Okay! Let's gooo!</p>
        </div>

        <Paper elevation={3}
          sx={{
            p: 1, width: '59%', display: 'flex',
            alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '20px solid white'
          }}
        >
          <div stlye={{ fontSize: '12px' }} className="how-to">
            <div className="img-examples">
              <img alt="vote" src="./vote-captured-ex.png" />
              <p>Available words are blank<br></br>
                Captured words are player colors</p>
              <img alt="vote" src="./vote-button-ex.png" />
              <p>Vote words out democratically</p>
              <img alt="vote" src="./vote-removed-ex.png" />
            </div>
          </div>
        </Paper>
      </Box>
      <Box
        sx={{
          visibility: visible.two,
          height: height.two,
          width: '100%',
          backgroundColor: '#f0f2ff',
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2
        }}>
        <div className="how-to about-description"
          style={{
            marginLeft: '5px',
            padding: '10px 15px',
            width: '38%', fontSize: "14px",
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }}
        >
          <div >
            <Button onClick={handleClickTwo}
              sx={{
                visibility: 'visible',
                color: color.two,
                fontSize: size.two,
                textDecoration: line.two,
                textUnderlineOffset: '5.5px',
                textDecorationThickness: '6px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '194px', right: '21px', fontWeight: '800', paddingRight: '0px', paddingLeft: '22px', margin: '0px', marginBottom: '0px'
              }}>About</Button>

            <p style={{ margin: 0 }}>Live, snappy interaction between players as they progress from the home screen, to the lobby, the game room, and finally the Podium.
            </p>
          </div>
          <br></br>
          <div style={{ paddingBottom: '11px' }}>Development <br></br> and Design:
            <div style={{ paddingTop: '10px' }}>
              <a href="https://github.com/N-Kovacs" style={{ paddingRight: '5px' }}> <img src="/github-mark.svg" width="18" height="18" alt="GitHub-link"></img></a>Nicholas Kovacs </div>
            <div>
              <a href="https://github.com/colespen" style={{ paddingRight: '5px' }}> <img src="/github-mark.svg" width="18" height="18" alt="GitHub-link"></img></a>Spencer Cole</div>
            <div>
              <a href="https://github.com/coding-quizzer" style={{ paddingRight: '5px' }}> <img src="/github-mark.svg" width="18" height="18" alt="GitHub-link"></img></a>William Gadd</div>
          </div>


        </div>
        <Paper elevation={3}
          sx={{
            p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'
          }}
        >
          <ul style={{ listStyle: 'square', paddingLeft: '24px' }}>
            <li>Uses Websockets via Socket.Io for an instant, real-time UX</li>
            <li>React Router for page navigation</li>
            <li>Functional design using MUI</li>
            <li>Create React App as the Base </li>
            <li>Node Express server for REST </li>
            <li>PostgreSQL for database backend</li>
          </ul>
          <br></br>
          <br></br>
          <br></br>
          <p style={{ fontSize: "13px" }}><a href="https://www.flaticon.com/free-icons/monsters" title="monsters icons">Monsters icons created by Smashicons - Flaticon</a></p>
        </Paper>
      </Box>
    </Container>
  );
}