import { useState, useEffect } from "react";
import axios from "axios";

import { Box } from "@mui/material";
import GameSettings from "./GameSettings";
import PlayersList from "./PlayersList";

import "./styles.css";

export default function Lobby(props) {
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
          maxWidth: '490px',
          width: "100%",
        }}
      >
        <div className="lobby-header">
          <h1>Lobby</h1>
        </div>
      </Box>
      <Box
        sx={{
          my: 1,
          px: 1,
          display: "flex",
          justifyContent: "space-between",
          maxWidth: '490px',
          height: "fit-content",
          width: "100%",
        }}
      >
        <PlayersList
          currentUser={props.currentUser}
          players={players}
          setGameData={props.setGameData}
        />
        <GameSettings
          setGameData={props.setGameData}
          categories={categories}
          handleStart={props.handleStart}
          url={props.url}
          url_path={props.url_path}
          updatePlayer = {props.updatePlayer}
        />
      </Box>
    </div>
  );
}
