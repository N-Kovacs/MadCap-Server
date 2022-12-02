import { useState } from "react";
import classNames from "classnames";

export default function AnswerListItem(props) {
  const [voted, setVoted] = useState(false);
  const [buttonMode, setButtonState] = useState(false);
  const [disableButton, setDisabled] = useState(false)
  // const playerCount = 6;
  // console.log(props.letter)
  // console.log(props.id)

  const alphaRows = classNames(
    props.captureColour,
    "alpha-item",
    { "letter-captured": props.captureColour },
    { alpha2: props.id > 13 },
    { alpha1: props.id <= 13 },
    { "results-phase": props.phase === "results" },
    {}
  );
  const voteAgainst = () => {
    let voteObject = {
      letter: props.letter,
      userId: props.userId,
      votesToEliminate: votesToEliminate,
      votes: (props.votesAgainst+1)
    }
    console.log(voteObject)
    props.sendVote(voteObject);
  };

  const handleClick = () => {
    console.log(props)
    voteAgainst();
    setVoted(true);
  };

  let votesToEliminate = 1
  if (props.playerCount > 2) {
    votesToEliminate = Math.floor((props.playerCount-1)/2)
  }

  //undo vote on reset
  if(disableButton && props.votesAgainst === 0){
    console.log("RESET BUTTON")
    setVoted(false)
    setDisabled(false)
    setButtonState(false)
  }


  let buttonsColour = props.votesAgainst * (1/votesToEliminate)
  // setButtonState(buttonClick < (playerCount / 2) - 1 ? false : true)
  if (props.votesAgainst >= votesToEliminate && !buttonMode) {
    console.log("here");
    setButtonState(true);
  }
  if ((voted || buttonMode) && !disableButton){
    console.log("breaker")
    setDisabled(true)
  }

  return (
    <li className={alphaRows}>
      {props.phase === "game" && <h2>{props.letter}</h2>}
      {props.phase === "results" && props.answer && (
        <h2>
          <button
            onClick={handleClick}
            disabled={disableButton}
            style={{
              backgroundColor: !buttonMode
                ? `rgba(255,0,0,${buttonsColour})`
                : "#313e4454",
              fontSize: "14px",
              textDecoration: !buttonMode ? "none" : "line-through",
            }}
          >
            {props.answer}
          </button>
        </h2>
      )}
      {props.phase === "results" && !props.answer && <h2>{props.letter}</h2>}
    </li>
  );
}
