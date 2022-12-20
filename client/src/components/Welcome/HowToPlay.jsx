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
          height: '375px',
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
          >Put on your thinking cap!</p>
          <p>Create your own unique word game and invite your friends to the ultimate word rush in a fast-paced, multiplayer environment.</p>
          <p>Beat the clock with as many guesses as possible without overlapping on any available letters.</p>
          <p>Type '/' to chat during game.</p>
          <p><br></br>Okay! Let's gooo!</p>
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
          width: '100%',
          height: '350px',
          backgroundColor: '#f0f2ff',
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2
        }}>
        <div className="how-to about-description"
          style={{
            marginLeft: '5px',
            padding: '10px', paddingRight: '10px',
            width: '52%', fontSize: "14px", 
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }}
        >
          <div >
            <h2 style={{
              fontSize: '20px', paddingLeft: '0px', marginBottom: '10px', margin: '0px'
            }}>About</h2>

            <p style={{ margin: 0 }}>Live, snappy interaction between players as they progress from the home screen, to the lobby, the game room, and finally the Podium.
            </p>
          </div>
          <br></br>
          <div style={{paddingBottom: '11px'}}>Development <br></br> and Design:
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
          <ul style={{ listStyle: 'square' }}>
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