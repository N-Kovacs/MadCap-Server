import Box from "@mui/material/Box";

export default function Notice(props) {

  //*** remove notice after 5 seconds ***/
  return (
    <Box className="notice">
      <h2 style={{
        width: '270px', height: '50px',
        textAlign: 'center'
      }}>
        {props.lastMessage}
      </h2>
    </Box>
  );
}