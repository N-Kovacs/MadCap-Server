import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { Box } from "@mui/material";
import GameSettings from "./GameSettings";
import PlayersList from "./PlayersList";
import PlayerView from "./PlayerView";

import "./styles.scss";

export default function Lobby(props) {
  const { game_url } = useParams();

  const [view, setView] = useState("PLAYER")
  const [categories, setCategories] = useState(null);
  const [checkIn, setCheckIn] = useState(false);
  
  const [display, setDisplay] = useState(0);
  
  const players = props.gameData.users;
  
  useEffect(() => {
    const timer =
      setTimeout(() => {
        setDisplay(100);
      }, 0);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    Promise.all([
      axios.get("/api/categories"),
      axios.get(`/api/games/${game_url}`),
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
    <div className="lobby-main"
      style={{opacity: display, transition: 'opacity 450ms ease' }}
    >
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
          updatePlayer = {props.updatePlayer}
        />}

        {view === "PLAYER" && <PlayerView/>}
      </Box>
    </div>
  );
}
