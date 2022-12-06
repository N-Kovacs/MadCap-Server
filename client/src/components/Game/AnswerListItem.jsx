import { useState, useEffect } from "react";
import classNames from "classnames";
import Button from "@mui/material/Button";

export default function AnswerListItem(props) {
  const [voted, setVoted] = useState(false);
  const [buttonMode, setButtonState] = useState(false);
  const [disableButton, setDisabled] = useState(false);
  // const playerCount = 6;
  // console.log(props.letter)
  // console.log(props.id)

  const alphaRows = classNames(
    // props.captureColour,
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
      votes: props.votesAgainst + 1,
    };
    props.sendVote(voteObject);
  };

  const handleClick = () => {
    voteAgainst();
    setVoted(true);
  };

  let votesToEliminate = 1;
  if (props.playerCount > 2) {
    votesToEliminate = Math.ceil((props.playerCount) / 2);
  }

  //undo vote on reset
  useEffect(() => {
    if (disableButton && props.votesAgainst === 0) {
      console.log(props.votesAgainst);
      console.log("RESET BUTTON");
      setVoted(false);
      setDisabled(false);
      setButtonState(false);
    }
  }, [props.votesAgainst]);

  let buttonsColour = props.votesAgainst * (1 / votesToEliminate);
  // setButtonState(buttonClick < (playerCount / 2) - 1 ? false : true)
  if (props.votesAgainst >= votesToEliminate && !buttonMode) {
    console.log("here");
    setButtonState(true);
  }
  if ((voted || buttonMode) && !disableButton) {
    console.log("breaker");
    setDisabled(true);
  }

  return (
    <li className={alphaRows}>
      {props.phase === "game" && <h2 style={{color:props.captureColour}}>{props.letter}</h2>}
      {props.phase === "results" && props.answer && (
        <h2>
          <Button className="vote-buttons"
            variant="outlined"
            color="success"
            onClick={handleClick}
            disabled={disableButton}
            sx={{
              backgroundColor: !buttonMode
                ? `rgba(255,0,0,${buttonsColour})`
                : "#313e4454",
              textDecoration: !buttonMode ? "none" : "line-through",
              fontSize: "15px", px: "6px", mb: "5px",
              color: 'black', borderColor: '#9C9C9A'
            }}
          >
            {props.answer}
          </Button>
        </h2>
      )}
      {props.phase === "results" && !props.answer && <h2>{props.letter}</h2>}
    </li>
  );
}
