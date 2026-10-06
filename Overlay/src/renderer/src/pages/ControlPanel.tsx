/* eslint-disable prettier/prettier */
import { Casters } from '@common/caster.type';
import { Colours } from '@common/colours.type';
import { Match } from '@common/match.type';
import { Box, Button, TextField } from '@mui/material';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import React, { useEffect, useState } from 'react';

export default function ControlPanel(): React.JSX.Element {

  const [tab, setTab] = useState(1);

  const [matchData, setMatch] = useState<Match | null>(null);
  const [colourData, setColours] = useState<Colours | null>(null);
  const [casterData, setCasters] = useState<Casters | null>(null);

  function updateScore(): void {
    setMatch((prev) => {
      if (!prev) return null;

      const nextState = {
        ...prev,
        team1: {
          ...prev.team1,
          score: prev.team1.score + 1,
        },
      };

      window.stateAPI.setMatch(nextState);

      return nextState;
    });
  }

  async function fetchState(): Promise<void> {
    try {
      const { match, colours, casters } = await window.stateAPI.getState();

      setMatch(match);
      setColours(colours);
      setCasters(casters);
    } catch (e) {
      console.error('Failed fetch: ' + e);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function initFetch(): Promise<void> {
      try {
        await fetchState();
      } catch (e) {
        if (isMounted) {
          console.error('Failed fetch: ' + e);
        }
      }
    }

    initFetch();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!matchData || !colourData || !casterData) {
    return <h1>Loading...</h1>
  }

  return (
    <>
    <Box sx={{ width: '100%', height: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_event, tab) => setTab(tab)} aria-label="">
            <Tab label="Initial info" value={1} />
            <Tab label="Match" value={2} />
            <Tab label="Colours" value={3} />
          </TabList>
        </Box>

        {/* ############################################################# */}

        <TabPanel value={1} sx={{display:'flex'}}>
          <Box>
          <Button
            onClick={ () => {
              window.stateAPI.resetCasters();
              fetchState();
            }}
          >
            RESET CASTERS
          </Button>

          {/* FT */}
          <Button
            onClick={ () => {
              setMatch((prev) => {
                if (!prev || prev.ft + 1 >= 5) return prev;

                const nextState = {
                  ...prev,
                  ft: prev.ft+1,
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }}
          >
            FT: +
          </Button>

          <Button
            onClick={ () => {
              setMatch((prev) => {
                if (!prev || prev.ft - 1 <= 0) return prev;

                const nextState = {
                  ...prev,
                  ft: prev.ft-1,
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }}
          >
            FT: -
          </Button>

          {/* Title input */}
          <TextField 
            id="outlined-basic"
            label="Title"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            value={matchData.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
              const newVal = event.target.value;

              // CAP STRING LENGTH TO A GOOD AMOUNT

              setMatch((prev) => {
                if (!prev) return null;

                const nextState = {
                  ...prev,
                  title: newVal,
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }}
          />
          </Box>

          <pre>{JSON.stringify(matchData, null, 2)}</pre>
          <pre>{JSON.stringify(casterData, null, 2)}</pre>
        </TabPanel>

        {/* ############################################################# */}

        <TabPanel value={2}>
          {/* Team1 Score increment */}
          <Button
            onClick={ updateScore }
          >
            TEAM1
          </Button>

          {/* Reset */}
          <Button
            onClick={ () => {
              window.stateAPI.resetMatch();
              fetchState();
            }}
          >
            RESET MATCH
          </Button>

          {/* Team1 input */}
          <TextField 
            id="outlined-basic"
            label="Team1"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            value={matchData.team1.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
              const newVal = event.target.value;

              // CAP STRING LENGTH TO A GOOD AMOUNT

              setMatch((prev) => {
                if (!prev) return null;

                const nextState = {
                  ...prev,
                  team1: {
                    ...prev.team1,
                    name: newVal,
                  },
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }}
          />

          {/* Team2 input */}
          <TextField 
            id="outlined-basic"
            label="Team2"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            value={matchData.team2.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
              const newVal = event.target.value;

              // CAP STRING LENGTH TO A GOOD AMOUNT

              setMatch((prev) => {
                if (!prev) return null;

                const nextState = {
                  ...prev,
                  team2: {
                    ...prev.team2,
                    name: newVal,
                  },
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }}
          />

          <pre>{JSON.stringify(matchData, null, 2)}</pre>
        </TabPanel>

        {/* ############################################################# */}

        <TabPanel value={3}>
          <Button
            onClick={ () => {
              window.stateAPI.resetColours();
              fetchState();
            }}
          >
            RESET COLOURS
          </Button>

          <pre>{JSON.stringify(colourData, null, 2)}</pre>
        </TabPanel>
      </TabContext>
    </Box>
    </>
  )
}
