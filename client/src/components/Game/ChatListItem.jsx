export default function ChatListItem(props) {

  // console.log("~~~~~~~~~~~~~~~~~~~: ", props.colour)

  return (
    <li>
      {props.type === "chat" &&
        <h4><b style={{ color: props.colour }}>{props.user}</b>: {props.message}</h4>
      }
      {props.type === "capture" &&
        <h4><b style={{ color: props.colour }}>{props.user}</b> captured {props.message}!</h4>
      }
      {props.type === "status" &&
        <h4><b style={{ color: props.colour }}>{props.message}</b></h4>
      }
    </li>
  );
}

