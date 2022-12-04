export default function ChatListItem(props) {

  // console.log("~~~~~~~~~~~~~~~~~~~: ", props.currentPlayer)

  return (
    <li>
      {props.type === "chat" &&
        <h4><b style={{ color: 'red' }}>{props.user}</b>: {props.message}</h4>
      }
      {props.type === "capture" &&
        <h4><b style={{ color: 'red' }}>{props.user}</b> captured {props.message}!</h4>
      }
      {props.type === "status" &&
        <h4><b style={{ color: 'red' }}>{props.user}ddd</b></h4>
      }
    </li>
  );
}

