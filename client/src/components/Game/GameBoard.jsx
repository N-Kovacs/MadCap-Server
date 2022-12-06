import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AnswerList from './AnswerList';
import Podium from './Podium';
import ResultsClock from './ResultsClock';
import { useNavigate } from 'react-router-dom';

export default function GameBoard(props) {

  const [border, setBorder] = useState("none");
  const [opacity, setOpacity] = useState(0);

  const navigate = useNavigate();

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
        }, 4000);
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
          <Button
            variant='outlined'
            onClick={() => props.transition("LOBBY")}
            sx={{
              p: 0, width: '23%', pt: '2px', opacity: opacity, fontSize: '13px',
              transition: 'opacity 1.2s ease-in'
            }}
          >
            New Game
          </Button>
          <h1 style={{ fontSize: '36px' }}>Podium</h1>
          <Button
            //FIX HOME so it goes to root (cookie clear successfully)
            variant='outlined'
            onClick={handleHome}
            sx={{
              p: 0, width: '23%', pt: '2px', opacity: opacity, fontSize: '13px',
              transition: 'opacity 1.5s ease-in 2s'
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