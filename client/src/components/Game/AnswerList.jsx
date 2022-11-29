import Box from '@mui/material/Box';

import AnswerListItem from "./AnswerListItem";

export default function AnswerList(props) {
  const answers = props.answers.map((answer) => {
    return (
      <Box>
        <AnswerListItem
          key={answer.letter}
          letter={answer.letter}
          captureColour={answer.captureColour}
        />
      </Box>
    );
  });
  return <ul>{answers}</ul>;
}
