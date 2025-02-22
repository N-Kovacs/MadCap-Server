import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom"

import AnswerList from './AnswerList';
import Podium from './Podium';
import ResultsClock from './ResultsClock';

import axios from "axios";
import { generateRandomString } from "../../helpers/helpers";


export default function GameBoard(props) {

  const [border, setBorder] = useState("none");
  const [opacity, setOpacity] = useState(0);
  const navigate = useNavigate();

  const makeGame = () => {
    const url = generateRandomString();

   
    axios.post("https://madcap.onrender.com/api/games", {url})
    .then(({ data }) => {
      props.setGameData(() => (
        {
          ...data,
          users: [],
          categories: [],
          subcategories: []
        })
      )})
    .then(() => (
      axios.post(`https://madcap.onrender.com/api/games/${url}/users`, {
        name: props.player.name,
        color: props.player.color,
        avatar_url: props.player.avatar_url,
        host: true
      })
    ))
    .then((response) => {
      const user = response.data
      props.setGameData((prev) => (
       { ...prev, users: [{...user}]}
      ))
      return user.id
    })
    .then((userID) => {
      props.setCurrentUser(userID)
    })
    .then(() => {
      navigate(`/${url}`)
    })
    .then(() => {
      props.transition("LOBBY")
      // console.log("State transition")
      props.sendOthers(url)
    })
    .catch((err) => {
      // console.log(url)
      console.error(err.message)});
}

  const handleHome = () => {
    props.removeCookies("user", { path: "/" });
    navigate('/');
    props.transition("WELCOME");
  };

  useEffect(() => {
    if (props.phase === "round") {
      setBorder("none");
    } else {
      setBorder("2px solid black");
    }
  }, [props.phase]);

  useEffect(() => {
    if (props.phase === "podium") {
      const timer =
        setTimeout(() => {
          setOpacity(100);
        }, 5500);
      return () => clearTimeout(timer);
    }
  }, [props.phase]);

  return (
    <div className="game-board-main">
      

      {props.phase !== "podium" ?

        <div className="game-header" style={{ borderBottom: border }}>
          {props.phase !== "round" &&
            <h2 className="category-header"
              style={{ margin: '4px', mr: '5px' }}
            >
              {props.category}:
            </h2>}

          {props.phase === "results" &&
            <h2 className="clock-header">
              <ResultsClock
                round={props.round}
                gameData={props.gameData}
                nextRound={props.nextRound}
                phase={props.phase}
                setStatePhase={props.setStatePhase}
              />
            </h2>}

          {props.phase !== "round" &&
            <h1 className="subcategory-header"
              style={{
                margin: '4px',
                textAlign: 'end'
              }}
            >
              {props.subcategory}
            </h1>}

        </div> :

        <div className="podium-header">

          { !props.player.host ?
          <Button className="podium-nav-buttons"
            disabled
            variant='outlined'
            onClick={makeGame}
            sx={{
              p: 0, width: '23%', pt: '2px', 
              opacity: 0, 
            }}
          >
            New Game
          </Button>
            :
            <Button className="podium-nav-buttons"
            
            variant='outlined'
            onClick={makeGame}
            sx={{
              p: 0, width: '23%', pt: '2px', 
              opacity: opacity, 
              fontSize: '13px',
              transition: 'opacity 1.2s ease-in', 
              border: '2px solid #dbe3ff',
              zIndex: 1000, 
              '&.MuiButtonBase-root': {backgroundColor: '#bbc9ff', color: 'white', fontSize: '13px', textShadow: '-1px 1px 2px black, 1px -0.5px 20px black'}, '&:hover' : { backgroundColor:' #8ea5ff',  border: '2px solid #819aff'}
            }}
          >
            New Game
          </Button>
        }

          <h1 style={{ fontSize: '45px' }}>Podium</h1>

          <Button className="podium-nav-buttons"
            variant='outlined'
            onClick={handleHome}
            sx={{
              p: 0, width: '23%', pt: '2px', 
              opacity: opacity, 
              fontSize: '13px',
              transition: 'opacity 4.5s ease-in', 
              border: '2px solid #dbe3ff',
              zIndex: 1000, 
              '&.MuiButtonBase-root': {backgroundColor: '#bbc9ff;', color: 'white', fontSize: '13px', textShadow: '-1px 1px 2px black, 1px -0.5px 20px black'}, '&:hover' : { backgroundColor:' #8ea5ff',  border: '2px solid #819aff'}
            }}
          >
            Home
          </Button>
        </div>
      }

      {
        props.phase === "game" ||
          props.phase === "results" ||
          props.phase === "vote" ||
          props.phase === "round" ?

          <AnswerList
            getNextSubcategory={props.getNextSubcategory}
            gameData={props.gameData}
            round={props.round}
            nextRound={props.nextRound}
            muted = {props.muted}

            answers={props.answers}
            lastMessage={props.lastMessage}
            phase={props.phase}
            setStatePhase={props.setStatePhase}
            sendVote={props.sendVote}
            playerCount={props.playerCount}
            clearBoard={props.clearBoard}
          />
          :
          props.phase === "podium" &&

          <Podium
            setStatePhase={props.setStatePhase}
            players={props.players}
          />
      }
    </div>
  );
}