import { useState, useEffect, useRef } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import axios from "axios";
import Welcome from "./Welcome";
import Lobby from "./Lobby";
import Game from "./Game";

import useVisualMode from "../hooks/useVisualMode";

import "./App.scss";

const SERVER = "https://madcap.onrender.com";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});

export default function App() {
  const { btnState } = useLoaderData();

  const game_url = useParams().game_url;

  const [gameData, setGameData] = useState({});
  const [name, setName] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies(["user"]);
  const [lobbyIsFull, setLobbyIsFull] = useState(false)
  const [reqUpdate, setReqUpdate] = useState(false);

  const WELCOME = "WELCOME";
  const LOBBY = "LOBBY";
  const GAME = "GAME";

  const { mode, transition } = useVisualMode(WELCOME);

  useEffect(() => {
    if (!game_url) {
      removeCookies("user", { path: "/" });
    }
  }, [game_url]);

  const isHost = () => {
   const currentUser = gameData.users
      && cookies.user
      && gameData.users
          .find(user => (user.id === Number(cookies.user)))
    return currentUser && currentUser.host
  }

  useEffect(() => {
    transition(isHost() ? LOBBY : WELCOME);
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const setCurrentUser = (id) => {
    setCookies("user", id, { path: "/" });
  };

  function handleStart() {
    socket.emit("host-start-game", game_url);
  }

  const modeRef = useRef(mode);
  const hostCookieRef = useRef(cookies);
  const url_pathRef = useRef(game_url);
  useEffect(() => {
    //without this, state ref in sockets will be out of date (when they are connected)
    modeRef.current = mode;
    hostCookieRef.current = cookies;
    url_pathRef.current = game_url;
  });

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("set-room", game_url);
    });

    socket.on("start-game", () => {
      console.log("host start game");
      console.log(modeRef.current);
      axios
        .get(`https://madcap.onrender.com/api/games/${url_pathRef.current}`)
        .then((gameResponse) => {
          setGameData(gameResponse.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
      if (modeRef.current === LOBBY) {
        transition(GAME);
      }
    });

    socket.on("update-players", () => {
      console.log("playerjoined");
      axios
        .get(`https://madcap.onrender.com/api/games/${url_pathRef.current}`)
        .then((gameResponse) => {
          setGameData(gameResponse.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    });

    return () => {
      socket.off("connect");
      socket.off("start-game");
      socket.off("update-players");
    };
  }, []);

  useEffect(() => {
    console.log("procs");
    if (reqUpdate === true) {
      console.log("update requested");
      setReqUpdate(false);
    }
  }, [reqUpdate]);

  const checkedIn = () => {
    socket.emit("set-room", game_url);
    console.log("checked in", game_url);
    socket.emit("joined-game", game_url);
  };
  const updatePlayer = () => {
    console.log("joined game");
    socket.emit("joined-game", game_url);
  };


  return (
    <div className="App">
      {mode === WELCOME && (
        <Welcome
          transition={transition}
          name={name}
          host={isHost}
          btnState={btnState}
          setCurrentUser={setCurrentUser}
          handleName={handleName}
          checkedIn={checkedIn}
          setLobbyIsFull={setLobbyIsFull}
          lobbyIsFull={lobbyIsFull}
          setGameData={setGameData}
        />
      )}

      {mode === LOBBY && (
        <Lobby
          host={isHost()}
          handleStart={handleStart}
          currentUser={Number(cookies.user)}
          gameData={gameData}
          setGameData={setGameData}
          checkedIn={checkedIn}
          reqUpdate={reqUpdate}
          setReqUpdate={setReqUpdate}
          updatePlayer={updatePlayer}
        />
      )}

      {mode === GAME && (
        <Game
          gameData={gameData}
          currentUser={Number(cookies.user)}
          removeCookies={removeCookies}
          transition={transition}
          host={isHost()}
          setGameData={setGameData}
          setCurrentUser={setCurrentUser}

        />
      )}
    </div>
  );
}
