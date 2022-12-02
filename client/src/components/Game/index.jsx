import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import Box from "@mui/material/Box";

import GameBoard from "./GameBoard";
import StatusBox from "./StatusBox";

import "./styles.css";
import axios from "axios";

const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});

const romanAlpha = [
  {
    id: 1,
    letter: "A",
    answer: "art",
    captureColour: "red",
    votesAgainst: 0,
  },
  {
    id: 2,
    letter: "B",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 3,
    letter: "C",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 4,
    letter: "D",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 5,
    letter: "E",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 6,
    letter: "F",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 7,
    letter: "G",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 8,
    letter: "H",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 9,
    letter: "I",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 10,
    letter: "J",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 11,
    letter: "K",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 12,
    letter: "L",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 13,
    letter: "M",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 14,
    letter: "N",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 15,
    letter: "O",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 16,
    letter: "P",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
  {
    id: 17,
    letter: "Q",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },

  {
    id: 18,
    letter: "R",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },

  {
    id: 19,
    letter: "S",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },

  {
    id: 20,
    letter: "T",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },

  {
    id: 21,
    letter: "U",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },

  {
    id: 22,
    letter: "V",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },

  {
    id: 23,
    letter: "W",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },

  {
    id: 24,
    letter: "X",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },

  {
    id: 25,
    letter: "Y",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },

  {
    id: 26,
    letter: "Z",
    answer: "",
    captureColour: "",
    votesAgainst: 0,
  },
];
const dummychat = [
  // {
  //   type: "chat",
  //   user: "dummychatuser",
  //   message: "dummychatmessage",
  // },
  // {
  //   type: "capture",
  //   user: "dummychatuser",
  //   message: "A",
  // },
];
// const dummyuser = {
//   name: "Dummy",
//   url: "madcap.com/322klj4",
//   colour: "Green",
//   avatar: 1,
//   score: 10,
//   admin: true
// };

export default function Game(props) {

  // extract all logic intouseApplicationData eventually...

  const [state, setState] = useState({
    answers: romanAlpha,
    chats: dummychat,
    isConnected: socket.connected,
    lastMessage: null,
    //phase : game, vote, round, results & podium
    phase: "round",
    players: props.gameData.users,
    //needs to be set to player
    player: props.gameData &&
      props.gameData.users.find((player) => player.id === props.currentUser),
    checkIn: false,
    category: "",
    subcategory: "",
    round: 1
  });

  console.log("gameData in Game ~~~~~~~~~~~: ", props.gameData);
  console.log("state.subcategories in Game ~~~~~~~~~~~: ", state.subcategories);

  useEffect(() => {
    axios.get(`/api/games/${props.url_path}/subcategories/1`)
      .then((response) => response.data)
      .then(({ category, subcategory }) => {
        setState((prev) => ({
          ...prev,
          category,
          subcategory
        }));
      });
  }, []);

  // fn setphase to results
  // in timer pass down props.phase result
  const setStatePhase = (phase) => {
    setState(prev => (
      { ...prev, phase: phase }
    ));
  };

  const nextRound = () => {
    if (state.round < props.gameData.rounds) {
      setState(prev => (
        { ...prev, round: prev.round +1}
      ));
    } 
  };

  //loop through subcategories for games
  // 

  const setAnswer = (message, store) => {
    //sets the details of the letter in game
    const answers = store.answers.map((answer) => {
      if (answer.letter === message.message[0]) {
        return {
          ...answer,
          answer: message.message,
          captureColour: message.colour,
          userId: message.userId,
        };
      }
      return answer;
    });
    return answers;
  };
  //this was done in a really dumb way, but works. should probably fix
  // however it does work..
  const confirmUsed = (message, gameState) => {
    for (const answer of gameState.answers) {
      if (answer.letter === message.message[0] && answer.answer) {
        return true;
      }
    }
    return false;
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const setPlayerScore = (id, gameState, change) => {
    const players = gameState.players.map((player) => {
      if (player.id === id) {
        let newScore = player.score + change;
        return {
          ...player,
          score: newScore,
        };
      }
      return player;
    });
    return players;
  };

  const setVote = (vote, gameState) => {
    //sets the details of the letter in game

    let votecount = 0;
    const answers = gameState.answers.map((answer) => {
      if (answer.letter === vote) {
        console.log(answer.votesAgainst);

        let newVotesAgainst = answer.votesAgainst + 1;
        votecount = newVotesAgainst;
        return {
          ...answer,
          votesAgainst: newVotesAgainst,
        };
      }
      return answer;
    });
    return [answers, votecount];
  };

  const stateRef = useRef(state);
  useEffect(() => {
    //without this, state ref in sockets will be out of date (when they are connected)
    stateRef.current = state;
  });

  useEffect(() => {
    // console.log(stateRef.current);

    socket.on("connect", () => {
      // console.log("connected");
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
      console.log(stateRef.current);
      if (
        message.type === "capture" &&
        !confirmUsed(message, stateRef.current)
      ) {
        let playerSet = setPlayerScore(message.userId, stateRef.current, 100);
        console.log(playerSet);

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
          players: playerSet,
        }));
      }
      if (message.type === "chat") {
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


    socket.on("vote", (vote) => {
      console.log(vote);

      const voteAnswersSet = setVote(vote.vote, stateRef.current);
      let playerSet = stateRef.current.players;
      //2 is dummy value
      console.log(voteAnswersSet);
      // if (props.votesAgainst > (playerCount - 1) / 2
      if (voteAnswersSet[1] >= (stateRef.current.players.length - 1) / 2) {
        playerSet = setPlayerScore(vote.answerPlayerId, stateRef.current, -150);
      }
      // console.log();
      setState((prev) => ({
        ...prev,
        players: playerSet,
        answers: voteAnswersSet[0],
      }));
      console.log(stateRef.current);
      // let playerSet = setPlayerScore(message.user, stateRef.current, 10)
    });


    //can be used to update from host

    socket.on("request-state", (message) => {
      console.log("state requested");
      if (stateRef.current.player.admin) {
        console.log("got here");
        let currentState = {
          answers: stateRef.current.answers,
          chats: stateRef.current.chats,
          room: props.url_path
        };
        console.log(currentState);
        socket.emit("send-state", currentState);
      }
    });

    socket.on("sync-state", (message) => {
      console.log("state syncing");
      setState((prev) => ({
        ...prev,
        message: message.answers,
        chats: message.chats,
      }));

    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off("vote");
      socket.off("request-state");
      socket.off("sync-state");
    };
  }, []);

  const sendMessage = (message, gamePhase = stateRef.current.phase) => {
    //had to move this here, since can connect when not on this page
    //less backend setting if just have a state "inroom"

    //needs url set to user
    let messagetype = "chat";
    if (gamePhase === "game") {
      messagetype = "capture";
    }
    let messageUpper = capitalizeFirstLetter(message);
    const messageObject = {
      message: messageUpper,
      room: props.url_path,
      colour: state.player.color,
      user: state.player.name,
      userId: state.player.id,
      type: messagetype,
    };
    // console.log(messageObject);
    // console.log(socket);
    socket.emit("send-message", messageObject);
  };
  const sendVote = (vote) => {
    const voteObject = {
      vote: vote.letter,
      answerPlayerId: vote.userId,
      room: props.url_path,
    };
    socket.emit("send-vote", voteObject);
  };
  const checkedIn = () => {
    sendMessage("has connected", "results");
    socket.emit("set-room", props.url_path);
    setState((prev) => ({
      ...prev,
      checkIn: true,
    }));
  };
  const clearBoard = () => {
    setState((prev) => ({
      ...prev,
      answers: romanAlpha,
    }));
  };

  if (!state.checkIn) {
    checkedIn();
  }

  return (
    <div className="game-main">
      <Box
        className="game-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 435,
          height: "100%",
          width: "100%",
          px: 0,
          backgroundColor: "#f0f2ff",
        }}
      >
        <GameBoard
          gameData={props.gameData}
          nextRound={nextRound}
          round={state.round}

          setStatePhase={setStatePhase}
          phase={state.phase}
          isConnected={state.isConnected}
          lastMessage={state.lastMessage}
          category={state.category}
          subcategory={state.subcategory}
          answers={state.answers}
          sendVote={sendVote}
          playerCount={state.players.length}
          players={state.players}
          clearBoard={clearBoard}
        />
        <StatusBox
          isConnected={state.isConnected}
          lastMessage={state.lastMessage}
          sendMessage={sendMessage}
          chats={state.chats}
          players={state.players}
          currentPlayer={state.player}
        />
      </Box>
    </div>
  );
}
