
import classNames from "classnames";

export default function DayListItem(props) {
  let captureColour = classNames(
    "letter-uncaptured",
    { "letter-captured": props.captured},
    {}
  );
  return (
    <li
    className = {captureColour}
    >
     <h2>{props.letter}</h2> 
    </li>
  );
};

