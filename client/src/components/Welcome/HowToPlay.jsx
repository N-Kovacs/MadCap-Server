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
          height: 350,
          display: 'flex',
          justifyContent: 'space-between',
          mt: 5,
          mb: 2
        }}>
        <div className="how-to how-to-description"
          style={{ marginLeft: '5px',
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
        <Paper elevation={3} sx={{ p: 1, width: '59%' }}>
          <div>

            <p>screnshots!!!!!!</p>
            <p>will................go.. here.....coool.</p>
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
          style={{ marginLeft: '5px',
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
          <p>A fast-paced multiplayer game</p>
          <p>Uses Websockets for a snappy, real-time UX</p>
          <p>Developed by:</p>
          <p>Nicholas Kovaks, Spencer Cole & William Gadd</p>
        </Paper>
      </Box>
    </Container>
  );
}