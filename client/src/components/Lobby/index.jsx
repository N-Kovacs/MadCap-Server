import { useState, useEffect } from "react";
import axios from "axios";

import { Box } from "@mui/material";
import GameSettings from "./GameSettings";
import PlayersList from "./PlayersList";
import PlayerView from "./PlayerView";

import "./styles.scss";

export default function Lobby(props) {
  const [view, setView] = useState("PLAYER")
  const [categories, setCategories] = useState(null);
  const [checkIn, setCheckIn] = useState(false);
  const players = props.gameData.users;

  useEffect(() => {
    Promise.all([
      axios.get("/api/categories"),
      axios.get(`/api/games/${props.url_path}`),
    ])
      .then(([categoriesResponse, gameResponse]) => {
        setCategories(categoriesResponse.data);
        props.setGameData(gameResponse.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
   setView(props.host ? "HOST" : "PLAYER")
  }, []);

  if (!checkIn) {
    console.log("lobbycheckin");
    props.checkedIn();
    setCheckIn(true);
  }



  return (
    <div className="lobby-main">
      <Box
        sx={{
          px: 2.5,
          display: "flex",
          maxWidth: '558px',
          width: "100%"
        }}
      >
        <div className="lobby-header" style={{zIndex: 1000}}>
          <h1 >Lobby</h1>
        </div>
      </Box>
      <Box
        sx={{
          my: 1,
          px: 1,
          display: "flex",
          justifyContent: "space-between",
          maxWidth: '558px',
          height: "fit-content",
          width: "100%",
          // backgroundColor: '#f5f5f585',
          // boxShadow: '0px -10px 125px whitesmoke'
        }}
      >
        <PlayersList
          currentUser={props.currentUser}
          players={players}
          setGameData={props.setGameData}
        />
        {view === "HOST" &&
        <GameSettings
          setGameData={props.setGameData}
          categories={categories}
          handleStart={props.handleStart}
          url={props.url}
          url_path={props.url_path}
          updatePlayer = {props.updatePlayer}
        />}

        {view === "PLAYER" && <PlayerView/>}
      </Box>
    </div>
  );
}
