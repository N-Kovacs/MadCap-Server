import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

import axios from 'axios';

import OptionsBox from "./OptionsBox";
import CategoriesBox from "./CategoriesBox";
import LinkBox from "./LinkBox";
import StartButton from './StartButton';

export default function GameSettings(props) {
  const { game_url } = useParams();
  const [settings, setSettings] = useState(
    {
      timer: 60,
      maxPlayers: 4,
      rounds: 3
    }
  );

  const [noCategories, setNoCategories] = useState(false);

  const [currentCategories, setCurrentCategories] = useState([]);
  useEffect(() => {
    setNoCategories(currentCategories.length === 0);
  }, [currentCategories.length]);

  const gamesPutRequest = (settings, currentCategories) => (
    axios.put(`api/games/${game_url}`, {
      settings,
      categories: currentCategories
    })
      .then(() => {
        axios.get(`api/games/${game_url}`)
          .then(({ data }) => props.setGameData(data));
      })
  );

  const handleSet = () => {
    props.updatePlayer();
    console.log("should have set true^");
    gamesPutRequest(settings, currentCategories)
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGameStart = () => {
    gamesPutRequest(settings, currentCategories)
      .then(() => props.handleStart())
      .catch((error) => {
        console.error(error.message);
      });
  };
  const buttonText = "Start the Game";

  return (
    <div className="game-settings-main">
      <Box className="cat-option-box"
        sx={{
          bgcolor: '#f0f5ff',
          border: '1.5px solid #c6c6c6',
          borderRadius: '3px',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: 'fit-content',
          pl: '2px', pb: '20px'
        }}>
        <div className="settings-header">
          <h2>Game Settings</h2>
        </div>
        <CategoriesBox categories={props.categories} currentCategories={currentCategories} setCurrentCategories={setCurrentCategories} />
        <OptionsBox settings={settings} setSettings={setSettings} handleSet={handleSet} />
      </Box>
      <Box className="game-settings-bottom-box"
        sx={{
          bgcolor: '#f0f5ff',
          border: '1.5px solid #c6c6c6',
          borderRadius: '3px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: 'fit-content',
          mt: '23px', pb: '10px'
        }}>
        <LinkBox />

        {noCategories || settings.timer === 0 || settings.maxPlayers === 0 ||
        settings.rounds === 0
          ? <Tooltip title="Please select at least one category before starting round">
            <div style={{ width: '93%' }}>
              <StartButton disabled>
                {buttonText}
              </StartButton>
            </div>
          </Tooltip>
          :
          <StartButton handleStart={handleGameStart}>
            {buttonText}
          </StartButton>
        }
      </Box>
    </div>
  );
}