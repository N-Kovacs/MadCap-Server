import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AnswerList from './AnswerList';
import Podium from './Podium';
import ResultsClock from './ResultsClock';
import { textAlign } from '@mui/system';

export default function GameBoard(props) {

  const handleHome = () => {
    props.removeCookies("user", { path: "/" });
    props.removeCookies("host", { path: "/" });
    props.transition("WELCOME");
  };

  // const [opacity, setOpacity] = useState(0);

    // useEffect(() => {
    //   if  (props.phase === "podium") {
    //     console.log("INSIDE THE USEFFECT IN GAMEBOARD!!")
    //   const timer =
    //   setTimeout(() => {
    //       setOpacity(100);
    //     }, 4000);
    //     return () => clearTimeout(timer);
    //   }
    // }, []);
 
  return (
    <div className="game-board-main">

      {props.phase !== "podium" ?
        <div className="game-header">
          {props.phase !== "round" &&
            <h2 className="category-header"
              style={{margin: '4px'}}
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
          <Button
            variant='outlined'
            onClick={() => props.transition("LOBBY")}
            sx={{
              p: 0, width: '96px', opacity: 100,
              transition: 'opacity 1.2s ease-in'
            }}
          >
            New Game
          </Button>
          <h1 style={{ fontSize: '32px' }}>Podium</h1>
          <Button
            //FIX HOME so it goes to root (cookie clear successfully)
            variant='outlined'
            onClick={handleHome}
            sx={{
              p: 0, width: '96px', opacity: 100,
              transition: 'opacity 1.5s ease-in 1s'
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