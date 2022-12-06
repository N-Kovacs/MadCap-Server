import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export default function UserName(props) {

  const enterWatch = (e) => {
    if(e.key === "Enter") {
      props.handleSubmit();
    }
  }

  const UserTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'lightblue',
      },
      '&:hover fieldset': {
        borderColor: 'orange',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'darkblue',
      },
      
    },
  });

  return (
    <UserTextField
      label="ENTER YOUR NAME"
      id="enter-username"
      autoComplete="off"
      onChange={props.handleName}
      onKeyPress={enterWatch}
      value={props.name}
      autoFocus={true}
      sx={{
        fontSize: '55px',
        m: 1,
        width: '100%',
        maxWidth: '350px',
        my: 1.5,
        '& .MuiInputBase-input': {
          caretColor: 'transparent',
          fontSize: 40,
          py: 0,
          height: 53
        }, '& .MuiInputBase-input:focus' : {backgroundColor: '#f0f4ff'}
      }}
    />
  );
}