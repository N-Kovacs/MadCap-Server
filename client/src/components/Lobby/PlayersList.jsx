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

  //  dummy memory!
  // const hardcodedPlayers = [
  //   { id: 8, color: 'blue', label: '8', imgPath: './avatars/avatar-temp-8.png', name: 'lorepuse' },
  //   { id: 7, color: 'green', label: '7', imgPath: './avatars/avatar-temp-7.png', name: 'doongle' },
  //   { id: 6, color: 'yellow', label: '6', imgPath: './avatars/avatar-temp-6.png', name: 'finglebat' },
  //   { id: 5, color: 'orange', label: '5', imgPath: './avatars/avatar-temp-5.png', name: 'pricklebash' },
  //   { id: 4, color: 'orange', label: '4', imgPath: './avatars/avatar-temp-4.png', name: 'dumbsqwad Jr.' }
  // ];

  const host = props.players && props.players.find(player => player.host === true)
  //extract players player item list.
  const PlayerListItem = props.players && props.players.map((player) =>
  !player.host && (
    <ListItem key={player.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: (player.id === props.currentUser) && 'hwb(222deg 93% 0%)',
        width: '113%', paddingTop: '10px', borderTopLeftRadius: '26px'

      }}>
      <ListItemAvatar sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Avatar src={player.avatar_url} alt={player.color} sx={{
          maxWidth: '70%',
          height: 'auto',
      }}>

        </Avatar>
        <CircleIcon sx={{ pl: 1, color: player.color }} />
      </ListItemAvatar>
      <ListItemText primary={player.name}
        sx={{ '.MuiTypography-root': { fontSize: "12px" } }} />
    </ListItem>
  ));

  const CustomStyle = styled('div')(({ theme }) => ({
    px: 0
    // backgroundColor: theme.palette.background.paper,
  }));


  return (
      <Box className="players-box" sx={{ height: 'fit-content' }}>
        <Paper style={{ height: '700px', width: '100%' }} elevation={3} sx={{ p: '15px', }}>
          <Box sx={{
            flexGrow: 1,
            maxWidth: 752,
            '& .MuiListItem-root': { px: 1 }
          }}
          >
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 0, mb: '9px' }} variant="h6" component="div">
                Players
              </Typography>

              <CustomStyle >
                <List dense={true} >
                  <ListItem sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    backgroundColor: 
                    (host && host.id === props.currentUser) && 'hwb(222deg 93% 0%)',
                    width: '113%', paddingTop: '10px', borderTopLeftRadius: '26px'
                  }}>
                    <ListItemAvatar sx={{ display: 'flex', alignItems: 'center', justifyItems: 'space-around' }}>
                      <Avatar src={host && host.avatar_url}sx={{}}>
                      </Avatar>
                      <CircleIcon sx={{ pl: 1, color: host && host.color }} />            
                      <Typography sx={{ fontSize: "12px", pl: 1 }}>
                        Host
                      </Typography>
                    </ListItemAvatar>

                    <ListItemText primary={host && host.name} />
                  </ListItem>
                </List>
                <List sx={{py: 0}}>
                  {props.players && PlayerListItem}
                </List>
              </CustomStyle>
            </Grid>
          </Box>
        </Paper>
      </Box>
  );
};