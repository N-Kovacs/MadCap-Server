import Box from '@mui/material/Box';

import GamePlayersList from "./GamePlayersList";
import Entry from "./Entry";
import ChatList from './ChatList';


export default function StatusBox(props) {
  
  return (
    <Box className="status-box" >

      <GamePlayersList
        currentPlayerID={props.currentPlayer.id}
        players={props.players} />

      <Box className="chat-box-main"
        sx={{
          backgroundColor: '#dde5ff',
          borderTop: '2px solid white',
          borderTopLeftRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pr: 0, pl: '4px', pb: '2px',
          m: 0,
          width: '71.5%',
          height: '100%',
          maxHeight: '292px'
        }}>
        <Box className="chat-box"
          sx={{
            backgroundColor: '#bec5dc',
            borderTopLeftRadius: '5px',
            height: '100%',
            width: '99%',
            overflow: 'auto', mr: '2px'
          }}>
          <ChatList
            chats={props.chats}
            currentPlayer={props.currentPlayer}
          />
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
