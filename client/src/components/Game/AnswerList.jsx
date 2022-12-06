import classNames from "classnames";

import AnswerListItem from "./AnswerListItem";
import Clock from './Clock';
import Notice from './Notice';
import Round from "./Round";
import Vote from "./Vote";


export default function AnswerList(props) {
  const firstHalf = props.answers.slice(0, 13);
  const secondHalf = props.answers.slice(13);
  const answers1 = firstHalf.map((answer) => {
    return (
      <AnswerListItem
        key={answer.id}
        id={answer.id}
        letter={answer.letter}
        captureColour={answer.captureColour}
        answer={answer.answer}
        userId={answer.userId}
        votesAgainst={answer.votesAgainst}
        phase={props.phase}
        sendVote={props.sendVote}
        playerCount={props.playerCount}
      />
    );
  });
  const answers2 = secondHalf.map((answer) => {
    return (
      <AnswerListItem
        key={answer.id}
        id={answer.id}
        letter={answer.letter}
        captureColour={answer.captureColour}
        answer={answer.answer}
        userId={answer.userId}
        votesAgainst={answer.votesAgainst}
        phase={props.phase}
        sendVote={props.sendVote}
        playerCount={props.playerCount}
      />
    );
  });

  const rowPhase = classNames(
    { game: props.phase === "game" },
    { results: props.phase === "results" },
    { podium: props.phase === "podium" }
  );

  return (
    <div className="game-board-inner">
      <ul className={`alpha-row alpha1 ${rowPhase}`}>{answers1}</ul>

      {props.phase === "game" && (
        <div className="game-board-inner-center">
        
            <Clock
              setStatePhase={props.setStatePhase}
              gameData={props.gameData}
              round={props.round}
            />
          <Notice 
          lastMessage={props.lastMessage} 
          timer={props.timer} 
          round={props.round} 
          />
        </div>
      )}
      {props.phase === "vote" &&
        <Vote setStatePhase={props.setStatePhase} />
      }
      {props.phase === "round" &&
        <Round
          getNextSubcategory={props.getNextSubcategory}
          setStatePhase={props.setStatePhase}
          clearBoard={props.clearBoard}
          gameData={props.gameData}
          nextRound={props.nextRound}
          round={props.round}
        />
      }
      <ul className={`alpha-row alpha2 ${rowPhase}`}>{answers2}</ul>
    </div>
  );
}
