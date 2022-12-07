import { Fragment, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ListItemAvatar, Avatar } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Podium(props) {

  // const handleHome = () => {
  //   props.removeCookies("user", { path: "/" });
  //     props.removeCookies("host", { path: "/" });
  //   props.transition("WELCOME")
  // }

  const [opacity, setOpacity] = useState(0);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    
  }, [])

  useEffect(() => {

    const playerList = [...props.players].sort((playerA, playerB) => (playerB.score - playerA.score))
    setPlayers(
      [...playerList]
        .map(player => ({ ...player, score: 0 }))
    )
    const timer =
      setTimeout(() => {
        setPlayers(playerList);
        setOpacity(100);
      }, 0);
    return () => clearTimeout(timer);
  }, []);
  // users as state variable, 

  const playerScoreItems = players.map(player => (
    <div key={player.id} className="podium-list-withpoint" style={{ marginTop: '8px' }}>
      <Item className="podium-list-item"
        key={player.id}
        sx={{
          backgroundColor: `${player.color}ba`,
          width: `${player.score / 4}px`,
          height: '50px',
          transition: 'width 2.5s ease-out',
          overflow: 'hidden',
          border: '1px solid black', pl: '2px'
        }}
      >
        <ListItemAvatar key={player.id}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            opacity: opacity, transition: 'opacity 1.5s ease-in'
          }}
        >
          <Avatar key={player.id}
          src={player.avatar_url} alt={player.label}
            sx={{
              maxWidth: '35%',
              height: 'auto'
            }}
          >
          </Avatar>
        </ListItemAvatar>
        <Typography >{player.name}</Typography>
      </Item>
      <Typography sx={{
        pl: '6px', fontSize: '13px',
        opacity: opacity, transition: 'opacity 4s ease-in'
      }}
      >
        {player.score}
      </Typography>
    </div>
  ));

  return (
    <Fragment>
      <div className="searchlights" id="search-left"></div>
      <div className="searchlights" id="search-right"></div>
      <Box className="podium-navigate"
      variant="text"
        sx={{
          width: '100%',
          px: '15px',
        }}>
      </Box>

      <div className="podium-board">
        <Box className="podium-list" sx={{ width: '100%' }}>
          <Stack spacing={2}>
            {playerScoreItems}
          </Stack>
        </Box>
      </div>
    </Fragment>
  );
}