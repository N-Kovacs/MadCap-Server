import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';

import GamePlayersList from "./GamePlayersList";
import Entry from "./Entry";
import ChatList from './ChatList';

export default function StatusBox(props) {
  console.log(props.currentPlayer.id)
  return (
    <Box className="status-box" >
    
      <GamePlayersList
      currentPlayerID={props.currentPlayer.id}
      players = {props.players} />

      <Box className="chat-box-main"
        sx={{
          backgroundColor: '#dde5ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pr: 0, pl: '4px', pb: '2px',
          m: 0,
          width: '71.5%',
          height: '100%'
          // maxHeight: '277px'
        }}>
        <Box className="chat-box"
          sx={{
            backgroundColor: '#bec5dc',
            height: '100%',
            width: '99%',
            overflow: 'auto', mr: '2px'
          }}>
        <ChatList chats={props.chats} />
        </Box>
        <Entry
          sendMessage={props.sendMessage}
          isConnected={props.isConnected}
          lastMessage={props.lastMessage}
        />
      </Box>
    </Box>
  );
}
