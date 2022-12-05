import ChatListItem from "./ChatListItem";

export default function ChatList(props) {

  // console.log("~~~~~~~~~~~~~~~~~~: ", props.chats)
  const chats = props.chats.map((chat, index) => {
    
  
    return (
      <ChatListItem
        key={index}
        message={chat.message}
        user={chat.user}
        type={chat.type}
        currentPlayer={props.currentPlayer}
        colour = {chat.colour}
      />
    );
  });
  

  return <ul className="chat-list">
    {chats.reverse()}

  </ul>;
}
//if type === chat and phase === "results" then render timer in chatbox
// Timer component <-------