import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export default function PlayerView () {
return (

  <div className="player-view-main">
    <Box className="cat-option-box"
      sx={{
        backgroundColor: '#f0f5ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        height: 'fit-content',
        ml: '6px', pl: '2px', pb: '20px'
      }}>
      <div className="player-view-header">
        <h2 className="player-view-header" >Waiting for Host to Start Round</h2>
      </div>
        <CircularProgress />
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