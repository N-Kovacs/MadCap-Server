import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom"

import Box from "@mui/material/Box";

import GameBoard from "./GameBoard";
import StatusBox from "./StatusBox";

import "./styles.scss";
// import axios from "axios";

const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});

const romanAlpha = [
  {
    id: 1,
    letter: "A",
    answer: "",
    captureColour: "",
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
  // const { subCats } = props.gameData.subcategories;
  // extract all logic into useApplicationData eventually...

  const { game_url } = useParams();

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
  const navigate = useNavigate();

  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const timer =
      setTimeout(() => {
        setDisplay(100);
      }, 0);
    return () => clearTimeout(timer);
  }, []);

  // fn setphase to results
  // in timer pass down props.phase result
  const setStatePhase = (phase) => {
    setState((prev) => ({ ...prev, phase: phase }));
  };

  const nextRound = () => {
    if (state.round < props.gameData.rounds) {
      setState(prev => (
        { ...prev, round: prev.round + 1 }
      ));
    }
  };

  const getNextSubcategory = () => {
    setState(prev => (
      { ...prev,
        category: 
        props.gameData.subcategories[(state.round - 1) % 
          props.gameData.subcategories.length].category,
        subcategory: props.gameData.subcategories[(state.round - 1) % 
          props.gameData.subcategories.length].subcategory,
      }
    ));
  };

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

    socket.on("connect", () => {
      socket.emit("set-room", game_url);
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
      console.log(message);
      const alp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      if (
        message.type === "capture" &&
        !confirmUsed(message, stateRef.current) &&
        alp.includes(message.message[0])
      ) {
        //set players to update score
        let playerSet = setPlayerScore(message.userId, stateRef.current, 100);
        //set answers to update answers
        let answerSet = setAnswer(message, stateRef.current);
        //set chat to update chat
        console.log(message.colour)
        let chatSet = [
          ...stateRef.current.chats,
          { type: "capture", user: message.user, message: message.message[0], colour: message.colour },
        ];
        setState((prev) => ({
          ...prev,
          answers: answerSet,
          chats: chatSet,
          lastMessage: message.message,
          players: playerSet,
        }));
      } else if (
        message.type === "capture" &&
        confirmUsed(message, stateRef.current) &&
        alp.includes(message.message[0])
      ) {
        let chatSet = [
          ...stateRef.current.chats,
          { type: "status", message: `${message.user} failed to capture ${message.message[0]}!`},
        ];
        setState((prev) => ({
          ...prev,
          chats: chatSet,
        }));

      }
      if (message.type === "chat") {
        let chatSet = [
          ...stateRef.current.chats,
          { type: "chat", user: message.user, message: message.message, colour:message.colour },
        ];
        setState((prev) => ({
          ...prev,
          chats: chatSet,
        }));
      }
      if (message.type === "status") {
        console.log("VOTE MESSAGE ", message);
        let statusMessage = "Vote Against Letter: " + message.message.vote + "(" + message.message.votes + "/" + message.message.votesToEliminate + ")"
        let chatSet = [
          ...stateRef.current.chats,
          { type: "status", message: statusMessage},
        ];
        setState((prev) => ({
          ...prev,
          chats: chatSet,
        }));
      }
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
          room: game_url
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
    socket.on("sent-next", (message) => {
      props.removeCookies("user", { path: "/" });
      props.removeCookies("host", { path: "/" });
      props.transition("WELCOME");
      navigate(`/${message}`)
    });


    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off("vote");
      socket.off("request-state");
      socket.off("sync-state");
      socket.off("sent-next");
    };
  }, []);

  const sendMessage = (message, gamePhase = stateRef.current.phase) => {
    //had to move this here, since can connect when not on this page
    //less backend setting if just have a state "inroom"

    //needs url set to user
    console.log(message)
    let messageType = "chat";
    let messageUpper = message
    if (gamePhase === "game") {
      messageType = "capture";
      messageUpper = capitalizeFirstLetter(message);
    }
    if (gamePhase === "status"){
      messageType = "status"
    }
    console.log(gamePhase)
    const messageObject = {
      message: messageUpper,
      room: game_url,
      colour: state.player.color,
      user: state.player.name,
      userId: state.player.id,
      type: messageType,
    };
    console.log(messageObject)
    socket.emit("send-message", messageObject);
  };
  const sendVote = (vote) => {
    const voteObject = {
      vote: vote.letter,
      answerPlayerId: vote.userId,
      room: game_url,
      votes: vote.votes,
      votesToEliminate: vote.votesToEliminate,

    };
    sendMessage(voteObject, "status");
    socket.emit("send-vote", voteObject);
  };
  const checkedIn = () => {
    sendMessage("has connected", "results");
    socket.emit("set-room", game_url);
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

  const sendOthers = (url) => {
    const sockObj = {
      room: props.url_path,
      url: url
    }
    socket.emit("send-others", sockObj);
  }

  if (!state.checkIn) {
    checkedIn();
  }

  return (
    <div className="game-main" style={{opacity: display, transition: 'opacity 1150ms ease-out' }}>
      <Box
        className="game-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: '850px',
          height: "100%",
          width: "100%",
          px: 0, pt: '2px',
          border: '2px solid #8a8a8a',
          borderRadius: '1%',
          // backgroundColor: "#f0f2ff",
          backgroundColor: "#f7f7ff",
          boxShadow: '1px 1px 80px white, -1px -1px 80px white, 1px -1px 80px white, -1px 1px 80px white',
          mt: '3%', mb: '3%', 
          maxHeight: '823px',
        }}
      >
        <GameBoard
          gameData={props.gameData}
          nextRound={nextRound}
          round={state.round}
          getNextSubcategory={getNextSubcategory}
          category={state.category}
          subcategory={state.subcategory}
          playerCount={state.players.length}
          players={state.players}

          setStatePhase={setStatePhase}
          phase={state.phase}
          isConnected={state.isConnected}
          lastMessage={state.lastMessage}
          answers={state.answers}
          sendVote={sendVote}
          clearBoard={clearBoard}
          removeCookies={props.removeCookies}
          transition={props.transition}
          host={props.host}
          setGameData={props.setGameData}
          player={state.player}
          setCurrentUser={props.setCurrentUser}
          sendOthers = {sendOthers}
        />
        <StatusBox
          isConnected={state.isConnected}
          lastMessage={state.lastMessage}
          sendMessage={sendMessage}
          chats={state.chats}
          players={state.players}
          currentPlayer={state.player}
          phase={state.phase}
        />
      </Box>
    </div>
  );
}