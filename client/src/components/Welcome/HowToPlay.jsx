import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function HowToPlay() {
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
      <Box
        sx={{
          backgroundColor: 'aliceblue',
          width: '100%',
          height: '57%',
          display: 'flex',
          justifyContent: 'space-between',
          mt: 5,
          mb: 2
        }}>
        <div className="how-to how-to-description"
          style={{
            marginLeft: '5px',
            padding: '10px', paddingRight: '10px',
            width: '43%', fontSize: "14px"
          }}
        >
          <h2 style={{
            fontSize: '20px', paddingLeft: '0px', margin: '0px', marginBottom: '10px'
          }}>How To Play</h2>

          <p style={{ marginBottom: '14px' }}
          >Put on your thinking cap and get ready for a word rush!</p>
          <p>Create your own unqiue word game and invite your friends for the ultimate brainstorm.</p>
          <p>beat the clock with as many guesses as possible without overlapping on any available letters.</p>
          <p>type '/' to chat during game.
            <br></br>Let's gooo!</p>
        </div>

        <Paper elevation={3}
          sx={{
            p: 1, width: '59%', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div stlye={{ fontSize: '12px' }} className="how-to">
            <div className="img-examples">
              <img alt="vote" src="./vote-captured-ex.png" />
              <p>available words are blank<br></br>
                captured words are player colors</p>
              <img alt="vote" src="./vote-button-ex.png" />
              <p>vote words out democratically</p>
              <img alt="vote" src="./vote-removed-ex.png" />
            </div>
          </div>
        </Paper>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 300,
          backgroundColor: '#f0f2ff',
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2
        }}>
        <div className="how-to about-description"
          style={{
            marginLeft: '5px',
            padding: '10px', paddingRight: '10px',
            width: '43%', fontSize: "14px"
          }}
        >
          <h2 style={{
            fontSize: '20px', paddingLeft: '0px', marginBottom: '10px', margin: '0px'
          }}>About</h2>

          <p style={{ margin: 0 }}>A fast-paced multiplayer word game Built as a part of LightHouse Labs web development course.
          </p>
          <br></br>
          <div>Development and Design:
            <div>Nicholas Kovacs <a href="https://github.com/N-Kovacs"> <img src= "/github-mark.svg" width="18" height="18" alt="image"></img></a></div>
            <div>Spencer Cole <a href="https://github.com/colespen"> <img src= "/github-mark.svg" width="18" height="18" alt="image"></img></a></div>
            <div>William Gadd <a href="https://github.com/coding-quizzer"> <img src= "/github-mark.svg" width="18" height="18" alt="image"></img></a></div>
            </div>


        </div>
        <Paper elevation={3}
          sx={{
            p: 1
          }}
        >
          <ul style={{ listStyle: 'square' }}>
            <li>Uses Websockets via Socket.Io for a snappy, real-time UX</li>
            <li>Functional design using MUI</li>
            <li>PostgreSQL for dabase backend</li>
            <li>Create React App as the Base </li>

          </ul>
        </Paper>
      </Box>
    </Container>
  );
}