import React, { useState } from "react";

import Box from "@mui/material/Box";

//Temporary fix?
export default function Entry(props) {
  const [message, setMessage] = useState("");

  // const sendMessage = () => {
  //   socket.emit("send-message", "hello");
  // };

  const send = () => {
    if (message[0] === "/") {
      props.sendMessage(message.slice(1), "results");
    } else {
      props.sendMessage(message);
    }
    setMessage("");
    // console.log(message);
  };


  const post = (e) => {
    if (props.phase === "game" ||
      props.phase === "round") {
      if (e.target.value.length < 16 || 
        e.target.value[0] === '/') {
        setMessage(e.target.value);
      }
    } else {
      setMessage(e.target.value);
    }
    // console.log('state change', e.target.value)
  };

  const enterWatch = (e) => {
    if (e.key === "Enter") {
      send();
    }
  };

  /// if event.target ==

  return (
    <Box className="entry-box" sx={{ width: '99%', mr: '2px' }}>
      {/* <p>Connected: {"" + props.isConnected}</p>
      <p>last message:{props.lastMessage || "-"}</p> */}
      <div className="messages-input"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: '26px'
        }}>
        <input id="message-box"
          style={{ width: '100%', border: '1px solid #bcbcbc'  }}
          type="text"
          onChange={post}
          onKeyPress={enterWatch}
          value={message}
          autoComplete="off"
        />
        <button id="submit" onClick={send}
        style={{border: '1px solid #bcbcbc'}}>Send</button>
      </div>
    </Box>
  );
}