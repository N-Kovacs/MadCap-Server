// import { useState, useEffect } from 'react';
import AnswerList from './AnswerList';
import Podium from './Podium';
import ResultsClock from './ResultsClock';

export default function GameBoard(props) {


  return (
    <div className="game-board-main">
      <div className="game-header">
        {props.phase !== "round" && <h2 className="category-header">
          {props.category}: {props.phase === "results" &&
            <ResultsClock
              round={props.round}
              gameData={props.gameData}
              nextRound={props.nextRound}
              phase={props.phase}
              setStatePhase={props.setStatePhase}
            />
          }
        </h2>}
        {props.phase !== "round" && <h1 className="subcategory-header"
          style={{ fontSize: '28px', textAlign: 'end' }}>

          {props.subcategory}
        </h1>}

      </div>

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
            removeCookies={props.removeCookies}
          />

      }
    </div>
  );
}