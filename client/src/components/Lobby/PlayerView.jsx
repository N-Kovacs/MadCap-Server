import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export default function PlayerView () {
return (

  <div className="player-view-main">
    <Box className="player-view-box"
      sx={{
        backgroundColor: '#f5f8ff;',
        border: '1.5px solid #c6c6c6',
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        ml: '6px', pl: '2px'
      }}>
      <div className="player-view-header">
        <h2 className="player-view-header" >Waiting for Host to Start Round</h2>
      </div>
        <CircularProgress sx={{mb: '65px'}}/>
    </Box>
    {/* <Box
      sx={{
        backgroundColor: '#f0f5ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 'fit-content',
        mt: '30px', ml: '6px', pb: '10px'
      }}>
    </Box> */}
  </div>
)};