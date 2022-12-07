import { Fragment } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';


export default function GamePlayersList(props) {
  // console.log("props.players~~~~~~~~~~~~ ",props.players)
  const host = props.players.find(player => player.host);
  //extract 
  const PlayerListItems = props.players.map((player) =>
    !player.host && (
      <ListItem key={player.id}
        style={{ paddingTop: '10px', paddingBottom: 0 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundColor: (player.id === props.currentPlayerID) && '#e9f0fe',
          width: '100%', paddingTop: '6px', borderTopLeftRadius: '26px'
        }}>
        <ListItemAvatar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            pl: '3px'
          }}>
          <Avatar src={player.avatar_url} alt={player.label}
            variant='rounded'
            sx={{ maxWidth: '30%', height: 'auto' }}>
          </Avatar>
          <CircleIcon sx={{ pl: 1, color: player.color }} />
          <Typography sx={{ fontSize: "10px", pl: 1 }}>
            {player.score}
          </Typography>
        </ListItemAvatar>
        <ListItemText primary={player.name}
          sx={{ '.MuiTypography-root': { fontSize: "12px", pl: 1 } }} />
      </ListItem>
    ));

  const CustomStyle = styled('div')(({ theme }) => ({
    px: 0,
    // backgroundColor: theme.palette.background.paper
  }));

  return (
    <Fragment>
      <Box className="players-box"
        sx={{ height: '100%', width: '33%', pl: '4px', pb: '2px' }}>
        <Paper className="player-box-inner"
          style={{ height: '99%', maxHeight: '270px', width: '100%',
          backgroundColor: '#ffffff', 
          overflow: 'auto' 
          // paddingRight: '10px', 
          }}
          elevation={3} sx={{ pl: '8px' }}>
          <Box sx={{
            flexGrow: 1,
            maxWidth: 752,
            '& .MuiListItem-root': { px: 1 }
          }}
          >
            <Grid item xs={12} md={6}>
              <Typography 
              sx={{ 
                mt: 0, mb: 0, pr: '3%', pl: '1%', 
                display: 'flex', justifyContent: 'space-between'
              }} 
              variant="h6" component="div">
                Players

                {props.muted && <VolumeOffIcon  style={{cursor: 'pointer'}}
                sx={{ pt: '3%', height: '25px', minWidth: '24px'}} 
                onClick={props.toggleMute}></VolumeOffIcon>}
                
                {!props.muted && <VolumeUpIcon style={{cursor: 'pointer'}}
                sx={{ pt: '3%', height: '25px', minWidth: '24px'}} 
                onClick={props.toggleMute}></VolumeUpIcon>}
              </Typography>
            
              <CustomStyle sx={{ '& .MuiList-root': { p: 0, pt: '2px' } }}>
                <List dense={true} >
                  <ListItem sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    backgroundColor: (host && host.id === props.currentPlayerID)
                      && '#e9f0fe', width: '100%', pt: '6px', pb: 0,
                    borderTopLeftRadius: '26px'
                  }}>
                    <ListItemAvatar sx={{ display: 'flex', alignItems: 'center', pl: '3px' }}>
                      <Avatar src={host && host.avatar_url} alt={host && host.label}
                        variant='rounded'
                        sx={{ maxWidth: '30%', height: 'auto' }}>
                      </Avatar>
                      <CircleIcon sx={{ pl: 1, color: host && host.color }} />
                      <Typography sx={{ fontSize: "12px", pl: 1 }}>
                        Host <br />
                        {host && host.score}
                      </Typography>
                    </ListItemAvatar>
                    <ListItemText primary={host && host.name}
                      sx={{ '.MuiTypography-root': { fontSize: "12px" } }}
                    />
                  </ListItem>
                </List>
                <List>
                  {PlayerListItems}
                </List>
              </CustomStyle>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};