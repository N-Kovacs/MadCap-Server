import { useState, useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import axios from "axios";
import Welcome from "./Welcome";
import Lobby from "./Lobby";
import Game from "./Game";

import useVisualMode from "../hooks/useVisualMode";

import "./App.css";

const SERVER = "https://madcap.onrender.com";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});

export default function App(props) {
  const { full_url, url_path, btnState } = useLoaderData();
  console.log("Button State", btnState);

  const [gameData, setGameData] = useState([]);
  const [name, setName] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies(["host", "user"]);
  const [reqUpdate, setReqUpdate] = useState(false);

  const WELCOME = "WELCOME";
  const LOBBY = "LOBBY";
  const GAME = "GAME";

  const { mode, transition } = useVisualMode(WELCOME);

  useEffect(() => {
    if (url_path === "/") {
      console.log("URL path", url_path);
      removeCookies("user", { path: "/" });
      removeCookies("host", { path: "/" });
    }
  }, [url_path]);

  useEffect(() => {
    transition(cookies.host ? LOBBY : WELCOME);
  }, [cookies.host, props.mode]);

  console.log("loader_url:", full_url);
  console.log("url_path:", url_path);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const setHost = () => {
    setCookies("host", true, { path: "/" });
  };

  const setCurrentUser = (id) => {
    setCookies("user", id, { path: "/" });
  };

  function handleStart() {
    socket.emit("host-start-game", url_path);
  }

  const modeRef = useRef(mode);
  const hostCookieRef = useRef(cookies);
  const url_pathRef = useRef(url_path);
  useEffect(() => {
    //without this, state ref in sockets will be out of date (when they are connected)
    modeRef.current = mode;
    hostCookieRef.current = cookies;
    url_pathRef.current = url_path;
  });

  useEffect(() => {
    // console.log(stateRef.current);

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
      // console.log(hostCookieRef.current.host)
      axios
        .get(`https://madcap.onrender.com/api/games/${url_pathRef.current}`)
        .then((gameResponse) => {
          setGameData(gameResponse.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    });

    // Promise.all([
    //   axios.get("/api/categories"),
    //   axios.get(`/api/games/${props.url_path}`)
    // ])
    // .then(([categoriesResponse, gameResponse]) => {
    //   setCategories(categoriesResponse.data);
    //   props.setGameData(gameResponse.data);
    // })
    // .catch(err => {
    //   console.error(err.message);
    // });

    return () => {
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
    socket.emit("set-room", url_path);
    console.log("checked in", url_path);
    socket.emit("joined-game", url_path);
  };
  const updatePlayer = () => {
    console.log("hello?");
    socket.emit("joined-game", url_path);
  };

  return (
    <div className="App">
      {mode === WELCOME && (
        <Welcome
          transition={transition}
          // remove slash from url path
          url_path={url_path.substring(1)}
          name={name}
          host={cookies.host}
          btnState={btnState}
          // avatar={avatar}
          setCurrentUser={setCurrentUser}
          handleName={handleName}
          setHost={setHost}
          checkedIn={checkedIn}
        />
      )}

      {mode === LOBBY && (
        <Lobby
          host={cookies.host}
          url={full_url}
          url_path={url_path}
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

      {mode === "GAME" && (
        <Game
          gameData={gameData}
          currentUser={Number(cookies.user)}
          url_path={url_path}
        />
      )}
    </div>
  );
}
