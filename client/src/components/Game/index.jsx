import Entry from "./Entry";
import AnswerList from "./AnswerList";
import ChatList from "./ChatList";

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});
//
const defaultAlp = [
  {
    letter: "a",
    answer: "",
    captureColour: "",
    id: 1,
  },
  {
    letter: "b",
    id: 2,
  },
  {
    letter: "c",
    id: 3,
  },
  {
    letter: "d",
    id: 4,
  },
  {
    letter: "z",
    id: 25,
  },
];
const dummychat = [
  {
    type: "chat",
    user: "dummychatuser",
    message: "dummychatmessage",
  },
  {
    type: "capture",
    user: "dummychatuser",
    message: "A",
  },
];
const dummyuser = {
  name: "Dummy",
  url: "madcap.com/322klj4",
  colour: "Green",
  avatar: 1,
  score: 10,
};

export default function Game(props) {
  const [state, setState] = useState({
    answers: defaultAlp,
    chats: dummychat,
    isConnected: socket.connected,
    lastMessage: null,
    phase: "game"
  });

  const setAnswer = (message, stort) => {
    //sets the details of the letter in game
    const answers = stort.answers.map((answer) => {
      if (answer.letter === message.message[0]) {
        return {
          ...answer,
          answer: message.message,
          captureColour: message.colour,
        };
      }
      return answer;
    });
    return answers;
  };
  //this was done in a really dumb way, but works. should probably fix
  const confirmUsed = (message, gameState) => {
    for (const answer of gameState.answers) {
      if (answer.letter === message.message[0] && answer.answer) {
        return true;
      }
    }
    return false;
  };

  const stateRef = useRef(state);
  useEffect(() => {
    //without this, state ref in sockets will be out of date (when they are connected)
    stateRef.current = state;
  });

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("set-room", dummyuser.url);
      setState({
        ...stateRef.current,
        isConnected: true,
      });
    });

    socket.on("disconnect", () => {
      setState({
        ...stateRef.current,
        isConnected: false,
      });
    });

    socket.on("message", (message) => {
      if (
        message.type === "capture" &&
        !confirmUsed(message, stateRef.current)
      ) {
        let answerSet = setAnswer(message, stateRef.current);
        let chatSet = [
          ...stateRef.current.chats,
          { type: "capture", user: message.user, message: message.message[0] },
        ];
        setState((prev) => ({
          ...prev,
          answers: answerSet,
          chats: chatSet,
          lastMessage: message.message,
        }));
      }
      if (message.type === "chat"){
        let chatSet = [
          ...stateRef.current.chats,
          { type: "chat", user: message.user, message: message.message },
        ];
        setState((prev) => ({
          ...prev,
          chats: chatSet,
          lastMessage: message.message,
        }));
      }

      // console.log(stateRef.current)
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  const sendMessage = (message) => {
    let messagetype = "chat"
    if (stateRef.current.phase === "game") {
      messagetype = "capture"
    }
    const messageObject = {
      message: message,
      room: dummyuser.url,
      colour: dummyuser.colour,
      user: dummyuser.name,
      type: messagetype,
    };
    console.log(messageObject)
    socket.emit("send-message", messageObject);
  };

  return (
    <div className="welcome-main">
      <AnswerList answers={state.answers} phase = {state.phase} />
      <ChatList chats={state.chats} />
      <Entry
        sendMessage={sendMessage}
        isConnected={state.isConnected}
        lastMessage={state.lastMessage}
        phase = {state.phase}
      />
    </div>
  );
}
