import { Fragment, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
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

  const [cookies, setCookies, removeCookies] = useCookies(["host", "user"]);

  const handleHome = () => {
    removeCookies("user", { path: "/" });
      removeCookies("host", { path: "/" });
    props.transition("WELCOME")
  }

  const [opacity, setOpacity] = useState(0);
  const [players, setPlayers] = useState(
    props.players.map(player => (
      { ...player, score: 0 }
    ))
  );

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setPlayers(props.players);
        setOpacity(100);
      }, 0);

    return () => clearTimeout(timer);
  }, []);
  // users as state variable, 

  const playerScoreItems = players.map(player => (
    <div className="podium-list-withpoint" style={{ marginTop: '8px' }}>
      <Item className="podium-list-item"
        key={player.id}
        sx={{
          backgroundColor: player.color,
          width: `${player.score / 8}px`,
          height: '45px',
          transition: 'width 2.5s ease-out',
          overflow: 'hidden',
          border: '1px solid black',
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
          <Avatar src={player.avatar_url} alt={player.label}
            sx={{
              maxWidth: '30%',
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
      <Box className="podium-navigate"
      variant="text"
        sx={{
          width: '100%',
          px: '15px',
        }}>
        <Button
        onClick={() => props.transition("LOBBY")}
        sx={{ p: 0, pb: '8px' }}>Make New Game
        </Button>
        <Button
        //FIX HOME so it goes to root
        onClick={handleHome}
        sx={{ p: 0, pb: '8px' }}>Home
        </Button>
      </Box>

      <div className="podium-board">
        <Box className="podium-list" sx={{ width: '100%', }}>
          <Stack spacing={2}>
            {playerScoreItems}
          </Stack>
        </Box>
      </div>
    </Fragment>
  );
}