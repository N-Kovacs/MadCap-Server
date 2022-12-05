import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";

import Avatar from "./Avatar";
import UserName from "./UserName";
import ActionButton from "./ActionButton";
import axios from "axios";
import { generateRandomString } from "../../helpers/helpers";
import { Alert } from "@mui/material";

export default function WelcomeBox(props) {
  const url = generateRandomString();

  const MAKE = "MAKE";
  const JOIN = "JOIN";

  const [btnState, setBtnState] = useState("MAKE");

  //there are two btnStates (props and this.state)

  useEffect(() => {
    setBtnState(props.btnState)
  }, [props.url_path])

  // if no link use MAKE (default state)
  // if there is a custom link use JOIN

  const [avatar_url, setAvatar_url] = useState();
  const [color, setColor] = useState();
  const [name, setName] = useState();

  const handleName = (e) => {
    if (e.target.value.length < 18) {
      setName(e.target.value);
    }
  };

  const navigate = useNavigate();

  const makeGame = () => {
    axios
      .post("https://madcap.onrender.com/api/games", { url })
      .then(({ data }) => {
        props.setGameData(() => ({
          ...data,
          users: [],
          categories: [],
          subcategories: [],
        }));
      })
      .then(() =>
        axios.post(`https://madcap.onrender.com/api/games/${url}/users`, {
          name,
          color,
          avatar_url,
          host: true,
        })
      )

      .then((response) => {
        const user = response.data;
        props.setGameData((prev) => ({ ...prev, users: [{ ...user }] }));
        return user.id;
      })
      .then((userID) => {
        props.setCurrentUser(userID);
      })
      .then(() => {
        navigate(`/${url}`);
      })
      .then(() => {
        props.transition("LOBBY");
        console.log("State transition");
      })
      .catch((err) => {
        console.log(url);
        console.error(err.message);
      });
  };

  const joinGame = () => {
    axios
      .get(`https://madcap.onrender.com/api/games/${props.url_path}`)
      .then((response) => response.data)
      .then(({ users, maxPlayers }) => {
        if (users.length >= maxPlayers) {
          props.setLobbyIsFull(true);
          throw new Error("Lobby is full");
        }
      })
      .then(() =>
        axios.post(
          `https://madcap.onrender.com/api/games/${props.url_path}/users`,
          {
            name,
            color,
            avatar_url,
            host: false,
          }
        )
      )
      .then((response) => {
        props.setCurrentUser(response.data.id);
      })
      .then(() => {
        props.transition("LOBBY");
        props.checkedIn();
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = () => {
    btnState === MAKE ? makeGame() : joinGame();
  };

  return (
    <Fragment>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          my: 1,
          px: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "397px",
          height: 340,
          width: "97%",
        }}
      >
        <Avatar setAvatar={setAvatar_url} setColor={setColor} />
        <UserName
          handleName={handleName}
          handleSubmit={handleSubmit}
          name={name}
        />
        {btnState === MAKE && (
          <ActionButton onClick={makeGame}>Make New Game</ActionButton>
        )}
        {btnState === JOIN && (
          <ActionButton onClick={joinGame}>Join the Game!</ActionButton>
        )}
      </Box>
      {props.lobbyIsFull && (
        <Alert icon={false} severity="error">
          Sorry. The lobby is currently full.
        </Alert>
      )}
    </Fragment>
  );
}
