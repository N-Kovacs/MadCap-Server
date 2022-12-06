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

          <p style={{ margin: 0 }}>Put on your thinking cap and get ready for a word rush!</p>
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

        </div>
        <Paper elevation={3}
          sx={{
            p: 1
          }}
        >
          <ul style={{ listStyle: 'none', padding: '5px' }}>
            <li>A fast-paced multiplayer game</li>
            <li>Uses Websockets for a snappy, real-time UX</li>
            <li>Developed by:</li>
            <li>Nicholas Kovaks, Spencer Cole & William Gadd</li>

          </ul>
        </Paper>
      </Box>
    </Container>
  );
}