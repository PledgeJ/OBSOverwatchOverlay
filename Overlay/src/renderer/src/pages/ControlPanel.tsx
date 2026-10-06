/* eslint-disable prettier/prettier */
import { Casters } from '@common/caster.type';
import { Colours } from '@common/colours.type';
import { Match } from '@common/match.type';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import React, { useEffect, useState } from 'react';
import { UserInput } from '@renderer/components/UserInput';

export default function ControlPanel(): React.JSX.Element {

  const [tab, setTab] = useState(1);

  const [matchData, setMatch] = useState<Match | null>(null);
  const [colourData, setColours] = useState<Colours | null>(null);
  const [casterData, setCasters] = useState<Casters | null>(null);

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
          {/* Team1 input */}
          <UserInput
            label="Team1"
            value={matchData.team1.name}
            onChange={(value)=>{
              setMatch((prev) => {
                if (!prev) return null;

                const nextState = {
                  ...prev,
                  team1: {
                    ...prev.team1,
                    name: value,
                  },
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }}
          />

          {/* Team2 input */}
          <UserInput
            label="Team2"
            value={matchData.team2.name}
            onChange={(value)=>{
              setMatch((prev) => {
                if (!prev) return null;

                const nextState = {
                  ...prev,
                  team2: {
                    ...prev.team2,
                    name: value,
                  },
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }}
          />



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
          <UserInput
            label="Title"
            value={matchData.title}
            onChange={(value)=>{
              setMatch((prev) => {
                if (!prev) return null;

                const nextState = {
                  ...prev,
                  title: value,
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }}
          />

          <Button
            onClick={ () => {
              setCasters((prev) => {
                if (!prev || prev.number + 1 > 8) return prev;

                const nextState = {
                  number: prev.number + 1,
                  casters: [...prev.casters, {name: `Name`, handle: `Handle`}]
                };

                window.stateAPI.setCaster(nextState);
                return nextState;
              });
            }}
          >
            Add CASTER
          </Button>

          {casterData.casters.map((caster, index) => (
            <Box key={index}>
              <UserInput 
                label='Name'
                value={caster.name}
                onChange={(value) => {
                  setCasters((prev) => {
                    if (!prev) return null;

                    const updatedCasters = prev.casters.map((c, i) => {
                      if (i == index) {
                        return { ...c, name: value }
                      }
                      return c
                    })

                    const nextState = {
                      ...prev,
                      casters: updatedCasters,
                    }

                    window.stateAPI.setCaster(nextState);
                    return nextState;
                  });
                }}
              />
              <UserInput 
                label='Handle'
                value={caster.handle}
                onChange={(value) => {
                  setCasters((prev) => {
                    if (!prev) return null;

                    const updatedCasters = prev.casters.map((c, i) => {
                      if (i == index) {
                        return { ...c, handle: value }
                      }
                      return c
                    })

                    const nextState = {
                      ...prev,
                      casters: updatedCasters,
                    }

                    window.stateAPI.setCaster(nextState);
                    return nextState;
                  });
                }}
              />

              {index !== 0 &&
                <Button
                  onClick={ () => {
                    setCasters((prev) => {
                      if (!prev || prev.number - 1 < 1) return prev;

                      const nextState = {
                        number: prev.number - 1,
                        casters: prev.casters.toSpliced(index, 1)
                      };

                      window.stateAPI.setCaster(nextState);
                      return nextState;
                    });
                  }}
                >
                  DELETE
                </Button>
              }
            </Box>
          ))}
          </Box>

          <pre>{JSON.stringify(matchData, null, 2)}</pre>
          <pre>{JSON.stringify(casterData, null, 2)}</pre>
        </TabPanel>





        {/* ############################################################# */}






        <TabPanel value={2} sx={{display:'flex'}}>
          
          <Box>

          {/* Reset */}
          <Button
            onClick={ () => {
              window.stateAPI.resetMatch();
              fetchState();
            }}
          >
            RESET SCORE
          </Button>

          {/* Map */}
          <FormControl fullWidth>
            <InputLabel id='mapSelectLabel'>Map</InputLabel>
            <Select
              labelId='mapSelectLabel'
              value={matchData.currMap.map}
              label='mapSelect'
              onChange={(e) => {
                setMatch((prev) => {
                  if (!prev) return prev;

                  const nextState = {
                    ...prev,
                    currMap: {...prev.currMap, map: e.target.value},
                  };

                  window.stateAPI.setMatch(nextState);
                  return nextState;
                });
              }}
            >
              <MenuItem value={'illios'}>Illios</MenuItem>
              <MenuItem value={'suravasa'}>Suravasa</MenuItem>
            </Select>
          </FormControl>

          {/* Team1Ban */}
          <FormControl fullWidth>
            <InputLabel id='Team1BanLabel'>Team 1 ban</InputLabel>
            <Select
              labelId='Team1BanLabel'
              value={matchData.currMap.team1ban}
              label='team1Ban'
              onChange={(e) => {
                setMatch((prev) => {
                  if (!prev) return prev;

                  const nextState = {
                    ...prev,
                    currMap: {...prev.currMap, team1ban: e.target.value},
                  };

                  window.stateAPI.setMatch(nextState);
                  return nextState;
                });
              }}
            >
              <MenuItem value={'kiriko'}>Kiriko</MenuItem>
              <MenuItem value={'lucio'}>Lucio</MenuItem>
            </Select>
          </FormControl>

          {/* Team2Ban */}
          <FormControl fullWidth>
            <InputLabel id='Team2BanLabel'>Team 2 Ban</InputLabel>
            <Select
              labelId='Team2BanLabel'
              value={matchData.currMap.team2ban}
              label='team1Ban'
              onChange={(e) => {
                setMatch((prev) => {
                  if (!prev) return prev;

                  const nextState = {
                    ...prev,
                    currMap: {...prev.currMap, team2ban: e.target.value},
                  };

                  window.stateAPI.setMatch(nextState);
                  return nextState;
                });
              }}
            >
              <MenuItem value={'kiriko'}>Kiriko</MenuItem>
              <MenuItem value={'lucio'}>Lucio</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex' }}>
            <Button
              onClick={ () => {
                if (matchData.currMap.map === '') return;

                setMatch((prev) => {
                  if (!prev) return prev;

                  const nextState = {
                    ...prev,
                    team1: {...prev.team1, score: prev.team1.score + 1},
                    currMap: {map: '', team1ban: '', team2ban: ''},
                    prevMaps: [
                      ...prev.prevMaps, 
                      { team1ban: prev.currMap.team1ban, team2ban: prev.currMap.team2ban, winner: 1, map: prev.currMap.map }
                    ]
                  };

                  window.stateAPI.setMatch(nextState);
                  return nextState;
                });
              }}
            >
              {matchData.team1.name} WON
            </Button>

            <Button
              onClick={ () => {
                if (matchData.currMap.map === '') return;

                setMatch((prev) => {
                  if (!prev) return prev;

                  const nextState = {
                    ...prev,
                    team2: {...prev.team2, score: prev.team2.score + 1},
                    currMap: {map: '', team1ban: '', team2ban: ''},
                    prevMaps: [
                      ...prev.prevMaps, 
                      { team1ban: prev.currMap.team1ban, team2ban: prev.currMap.team2ban, winner: 2, map: prev.currMap.map }
                    ]
                  };

                  window.stateAPI.setMatch(nextState);
                  return nextState;
                });
              }}
            >
              {matchData.team2.name} WON
            </Button>

            <Button
              onClick={ () => {
                setMatch((prev) => {
                  if (!prev) return prev;

                  const last = prev.prevMaps.at(-1);
                  if (!last) return prev;

                  const nextState = {
                    ...prev,
                    team1: {...prev.team1, score: last.winner === 1 ? prev.team1.score - 1 : prev.team1.score},
                    team2: {...prev.team2, score: last.winner === 2 ? prev.team2.score - 1 : prev.team2.score},
                    currMap: {map: last.map, team1ban: last.team1ban, team2ban: last.team2ban},
                    prevMaps: [...prev.prevMaps.toSpliced(-1, 1)]
                  };

                  window.stateAPI.setMatch(nextState);
                  return nextState;
                });
              }}
            >
              UNDO
            </Button>
          </Box>
          
          </Box>

          <pre>{JSON.stringify(matchData, null, 2)}</pre>
        </TabPanel>






        {/* ############################################################# */}



        


        <TabPanel value={3} sx={{display: 'flex'}}>
          <Box>
            <Button
              onClick={ () => {
                window.stateAPI.resetColours();
                fetchState();
              }}
            >
              RESET COLOURS
            </Button>

            {/* Team 1 colour */}
            <input 
              type='color'
              value={colourData.team1}
              onChange={(e) => {
                const newVal = e.target.value;

                setColours((prev) => {
                if (!prev) return null;

                const nextState = {
                  ...prev,
                  team1: newVal,
                };

                window.stateAPI.setColour(nextState);
                return nextState;
              });
              }}
            />

            {/* Team 2 colour */}
            <input 
              type='color'
              value={colourData.team2}
              onChange={(e) => {
                const newVal = e.target.value;

                setColours((prev) => {
                if (!prev) return null;

                const nextState = {
                  ...prev,
                  team2: newVal,
                };

                window.stateAPI.setColour(nextState);
                return nextState;
              });
              }}
            />

            {/* Team 1 text */}
            <input 
              type='color'
              value={colourData.team1Text}
              onChange={(e) => {
                const newVal = e.target.value;

                setColours((prev) => {
                if (!prev) return null;

                const nextState = {
                  ...prev,
                  team1Text: newVal,
                };

                window.stateAPI.setColour(nextState);
                return nextState;
              });
              }}
            />

            {/* Team 2 text */}
            <input 
              type='color'
              value={colourData.team2Text}
              onChange={(e) => {
                const newVal = e.target.value;

                setColours((prev) => {
                if (!prev) return null;

                const nextState = {
                  ...prev,
                  team2Text: newVal,
                };

                window.stateAPI.setColour(nextState);
                return nextState;
              });
              }}
            />

          </Box>

          <pre>{JSON.stringify(colourData, null, 2)}</pre>
        </TabPanel>
      </TabContext>
    </Box>
    </>
  )
}
