import { useState, useEffect, Fragment } from "react";

export default function ResultsClock(props) {
  const [voteTimer, setVoteTimer] = useState(40);

  useEffect(() => {
    let timer = 0;
    if (props.phase === "results") {
      timer = voteTimer > 0 && setTimeout(() => setVoteTimer(prev => (prev - 1)), 1000);
    }
    if (voteTimer === 0 && props.round < props.gameData.rounds) {
      props.nextRound();
      props.setStatePhase("round");
    } 
    if (voteTimer === 0 && props.round === props.gameData.rounds) {
      props.setStatePhase("podium");
    } 

    return () => clearTimeout(timer);
  }, [voteTimer]);

  return (
    <Fragment>
      <span className="results-clock" 
      style={{ color: "salmon", fontSize: '28px', pl: '10px' }}>
        {voteTimer}
      </span>
    </Fragment>
  );
}