import WelcomeBox from './WelcomeBox';
import HowToPlay from './HowToPlay';

import './styles.scss';

export default function Welcome(props) {

  return (
    <div className="welcome-main">
      <h1 className="main-title">MadCap</h1>
      <WelcomeBox
        btnState={props.btnState}
        host={props.host}
        url_path={props.url_path}
        name={props.name}
        setCurrentUser={props.setCurrentUser}
        handleName={props.handleName}
        newPlayer={props.newPlayer}
        onClick={props.onClick}
        setHost={props.setHost}
        transition={props.transition}
        checkedIn = {props.checkedIn}
        setLobbyIsFull={props.setLobbyIsFull}
        lobbyIsFull={props.lobbyIsFull}
      />
      <HowToPlay />
    </div>
  );
}