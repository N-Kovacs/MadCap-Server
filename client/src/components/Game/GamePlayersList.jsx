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


export default function PlayersList(props) {


  //extract 
  const PlayerListItem = props.players.map((player) =>
  (
    <ListItem key={player.id}
      style={{ padding: 0 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
      <ListItemAvatar
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Avatar src={player.imgPath} alt={player.label} sx={{ maxWidth: '30%', height: 'auto' }}>
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
        sx={{ 
          height: 'fit-content', width: '34%', pl: '4px', pb: '4px' }}>
        <Paper style={{ maxHeight: '315px', width: '100%', paddingRight: '10px', overflow: 'auto' }} elevation={3} sx={{ pl: '8px', }}>
          <Box sx={{
            flexGrow: 1,
            maxWidth: 752,
            '& .MuiListItem-root': { px: 0 }
          }}
          >
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 0, mb: 0 }} variant="h6" component="div">
                Players
              </Typography>

              <CustomStyle sx={{ '& .MuiList-root': { p: 0, pt: 1 } }}>
                <List dense={true} >
                  <ListItem sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: 0
                  }}>
                    <ListItemAvatar sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ maxWidth: '40%', height: 'auto' }}>
                      </Avatar>
                      <Typography sx={{ fontSize: "12px", pl: 1 }}>
                        Host
                      </Typography>
                    </ListItemAvatar>
                    <ListItemText primary={props.name} />
                  </ListItem>
                </List>
                <List>
                  {PlayerListItem}
                </List>
              </CustomStyle>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};