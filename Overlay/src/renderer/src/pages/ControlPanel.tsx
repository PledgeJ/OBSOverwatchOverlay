/* eslint-disable prettier/prettier */
import type { Casters } from '@common/caster.type';
import type { Colours } from '@common/colours.type';
import type { Match } from '@common/match.type';
import type { ServerStatus } from '@common/servers.type';
import { MAPS, HEROES } from '@renderer/components/list'

import { obsConn } from '../OBSConnection';

import { Box, Button, Collapse, FormControl, InputLabel, MenuItem, Select, ToggleButton, Typography } from '@mui/material';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import React, { useEffect, useRef, useState } from 'react';
import { UserInput } from '@renderer/components/UserInput';

import { FaCheckCircle, FaExclamationTriangle, FaMicrophone } from "react-icons/fa";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlPanel(): React.JSX.Element {
  const DEFAULT_SERVER_STATUS: ServerStatus = {
    http: { 
      status: true, 
      port: 0, 
    },
    ws: {
      status: true,
      port: 0,
    },
  }

  const [open, setOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>(DEFAULT_SERVER_STATUS);
  const [obsWS, setOBSWS] = useState(false);

  const [tab, setTab] = useState(1);

  const [matchData, setMatch] = useState<Match | null>(null);
  const [colourData, setColours] = useState<Colours | null>(null);
  const [casterData, setCasters] = useState<Casters | null>(null);

  const load = useRef(true);

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

  useEffect(() => {
    console.log('server sync')
    return window.stateAPI.syncServerStatus(setServerStatus)
  }, [])

  useEffect(() => obsConn.onStatus(setOBSWS), []);
  useEffect(() => {
    if (!matchData || !load) { return; }
    obsConn.connect(matchData.obsPass)
  }, [matchData]);

  if (!matchData || !colourData || !casterData) {
    return <h1>Loading...</h1>
  }

  const left = matchData.isFlipped ? 
  { team: matchData.team2, ban: matchData.currMap.team2ban, colour: {team: colourData.team2, text: colourData.team2Text}, listenin: matchData.listenin.team2 } : 
  { team: matchData.team1, ban: matchData.currMap.team1ban, colour: {team: colourData.team1, text: colourData.team1Text}, listenin: matchData.listenin.team1 }; 

  const right = matchData.isFlipped ? 
  { team: matchData.team1, ban: matchData.currMap.team1ban, colour: {team: colourData.team1, text: colourData.team1Text}, listenin: matchData.listenin.team1 } :
  { team: matchData.team2, ban: matchData.currMap.team2ban, colour: {team: colourData.team2, text: colourData.team2Text}, listenin: matchData.listenin.team2 }; 

  const active = serverStatus.http.status && serverStatus.ws.status;

  let connNum: number = 0
  if (active) { connNum++; }
  if (obsWS) { connNum++; }

  return (
    <>

    {/* ############################ TOP TEAM DISPLAY ################################# */}
    
    <Box sx={{margin: 2, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      
      <Box sx={{width: 400, display: 'flex', alignItems: 'center', gap: 1}}>
        <Box sx={{ 
          zIndex: 1,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: 20, 
          backgroundColor: left.colour.team, 
          borderRadius: 1, 
          paddingX: 2, 
          ml: 2
        }}>
          <h1>{left.team.name}</h1>
          <h1 className='score' style={{backgroundColor: `color-mix(in srgb, ${left.colour.team}, black 25%)`}} >{left.team.score}</h1>
        </Box>
        <Box sx={{
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center', 
          padding: 1, 
          backgroundColor: left.colour.team, 
          borderRadius: 1,
          transform: left.listenin ? 'translateX(0)' : 'translateX(-55px)',
          transition: 'transform 0.3s ease',
        }}>
          <FaMicrophone size={25}/>
        </Box>
      </Box>

      <Box>
        <h1>FT{matchData.ft}</h1>
      </Box>

      <Box sx={{Width: 400, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'right', mr: 2}}>
        <Box sx={{
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center', 
          padding: 1, 
          backgroundColor: right.colour.team, 
          borderRadius: 1,
          transform: right.listenin ? 'translateX(0)' : 'translateX(65px)',
          transition: 'transform 0.3s ease',
        }}>
          <FaMicrophone size={25}/>
        </Box>
        <Box sx={{ 
          zIndex: 1,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: 20, 
          backgroundColor: right.colour.team, 
          borderRadius: 1, 
          paddingX: 2, 
        }}>
          <h1 className='score' style={{backgroundColor: `color-mix(in srgb, ${right.colour.team}, black 25%)`}}>{right.team.score}</h1>
          <h1>{right.team.name}</h1>
        </Box>
      </Box>
    </Box>

    <Box sx={{ width: '100%', height: '100%', typography: 'body1' }}>
      
      {/* ############################ TAB MENU ################################# */} 

      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: 2.5}}>
            <TabList 
            onChange={(_event, tab) => setTab(tab)} 
            sx={{
              '& .MuiTab-root': { color: '#cbd5e1' },
              '& .Mui-selected': { color: '#ffffff' },
              '& .MuiTabs-indicator': { backgroundColor: '#3b82f6' },
            }}
            aria-label="">
              <Tab label="Initial info" value={1} />
              <Tab label="Match" value={2} />
              <Tab label="Intermission" value={3} />
              <Tab label="Colours" value={4} />
            </TabList>

            <Box>
              <Button
                onClick={() => setOpen((prev) => !prev)}
                startIcon={
                  <ExpandMoreIcon
                    sx={{
                      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      color: connNum == 2 ? '#57de3e' : '#ff073a',
                      filter: connNum == 2 ? 'drop-shadow(0 0 2px rgba(57, 255, 20, 0.8))' : 'drop-shadow(0 0 2px rgba(255, 7, 58, 0.8))',
                    }}
                  />
                }
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  color: connNum == 2 ? '#57de3e' : '#ff073a',
                  filter: connNum == 2 ? 'drop-shadow(0 0 2px rgba(57, 255, 20, 0.8))' : 'drop-shadow(0 0 2px rgba(255, 7, 58, 0.8))',
                  fontSize: 14          
                }}>
                  <Typography sx={{fontSize: 14}}>Connection: {connNum}/2</Typography>
                  {connNum == 2 ? <FaCheckCircle /> : <FaExclamationTriangle />}
                </Box>
              </Button>

              <Collapse in={open} timeout="auto" unmountOnExit
                sx={{ position: 'absolute', 
                  right: 0, 
                  zIndex: 999, 
                  mr: 1, mt: 1, p: 2, 
                  backgroundColor: '#2c3542', 
                  boxShadow: 5, 
                  borderRadius: 1 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,
                  color: active ? '#57de3e' : '#ff073a',
                 }}>
                  {active ? <FaCheckCircle /> : <FaExclamationTriangle />}
                  <Typography>Overlay HTTP server</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,
                  color: obsWS ? '#57de3e' : '#ff073a',
                 }}>
                  {obsWS ? <FaCheckCircle /> : <FaExclamationTriangle />}
                  <Typography>OBS Websocket connection</Typography>
                </Box>

                <br/>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <UserInput
                    label='OBS Password'
                    disabled={obsWS}
                    value={matchData.obsPass}
                    onChange={(value) => {
                      setMatch((prev) => {
                        if (!prev) return null;

                        const nextState = {
                          ...prev,
                          obsPass: value
                        };

                        window.stateAPI.setMatch(nextState);
                        return nextState;
                      });
                    }}
                  />

                  <Button
                    sx={{ display: obsWS ? 'none' : 'block'}}
                    onClick={ () => {
                      if (!matchData || obsWS) { return; }
                      obsConn.connect(matchData.obsPass)
                    }}
                  >
                    Connect
                  </Button>

                  <Button
                    sx={{ display: obsWS ? 'block' : 'none'}}
                    onClick={ () => {
                      if (obsWS) { obsConn.disconnect() }
                    }}
                  >
                    Disconnect
                  </Button>

                </Box>

                <br />
                <Typography>(In OBS)</Typography>
                <Typography>• Tools &gt; WebSocket Server Settings</Typography>
                <Typography>• Tick Enable WebSocket server if it isn’t already</Typography>
                <Typography>• Make sure Server Port is 4455 (the default)</Typography>
                <Typography>• Tick Enable Authentication</Typography>
                <Typography>• Set a Server Password, or click Generate Password</Typography>
                <Typography>• Click Show Connect Info</Typography>
                <br/>

                <Box>
                  {active ? 
                  <>
                    <Typography>http://localhost:{serverStatus.http.port}/ingame</Typography>
                    <Typography>http://localhost:{serverStatus.http.port}/intermission</Typography>
                    <br/>                  
                    <Typography>• Add each link as a browser source in obs</Typography>
                    <Typography>• Set height and width to 1920 x 1080</Typography>
                  </>
                  : 
                  <>
                    <Typography>Error with overlay:</Typography>
                    {serverStatus.http.error && <Typography>{serverStatus.http.error}</Typography>}
                    {serverStatus.http.error && <Typography>{serverStatus.ws.error}</Typography>}
                  </>}
                </Box>
              </Collapse>
            </Box>

          </Box>
        </Box>



        {/* ############################ INITIAL INFO TAB ################################# */}



        <TabPanel value={1}>
          <br/>
          <Box sx={{display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
              {/* FT */}
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
                -
              </Button>

              <Typography variant='h4'>FT{matchData.ft}</Typography>

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
                +
              </Button>
            </Box>

            {/* Title input */}
            <UserInput
              width={600}
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
          </Box>

          <br/>

          <Box sx={{display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{display:'flex', gap: 5}}>
              {/* Team1 input */}
              <UserInput
                width={410}
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
                width={410}
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
            </Box>
          </Box>
          
          <br/>
          <br/>

          <Box>
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

            <Button
              onClick={ () => {
                window.stateAPI.resetCasters();
                fetchState();
              }}
            >
              RESET CASTERS
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: 250, overflowY: 'scroll',
           '&::-webkit-scrollbar': {
              display: 'none',
            }, 
          }}>
            {casterData.casters.map((caster, index) => (
              <Box key={index}
                sx={{
                  backgroundColor: '#2c3542',
                  padding: 2.5,
                  borderRadius: 3,
                  display: 'flex',
                  gap: 2,
                }}
              >
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
        </TabPanel>



        {/* ############################ MATCH TAB ################################# */}



        <TabPanel value={2}>
          <Button
            onClick={ () => {
              setMatch((prev) => {
                if (!prev) return prev;

                const nextState = {
                  ...prev,
                  isFlipped: !prev.isFlipped,
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }}
          >
            SWAP SIDES
          </Button>

          {/* Reset */}
          <Button
            onClick={ () => {
              setMatch((prev) => {
                if (!prev) return prev;

                const nextState = {
                  ...prev,
                  currMap: {map: '', team1ban: '', team2ban: ''},
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }}
          >
            RESET MAP
          </Button>

          <Button
            onClick={ () => {
              window.stateAPI.resetMatch();
              fetchState();
            }}
          >
            RESET SCORE
          </Button>
          
          {matchData?.currMap.map !== '' ? (
            <Box
              component='img'
              src={`/maps/${matchData?.currMap.map}.webp`}
              sx={{
                width: '100%',
                height: 175,
                overflow: 'hidden',
                objectFit: 'cover',
                objectPosition: '0% 60%',
                border: '#2c3542 1px solid',
                borderRadius: 1,
                backgroundColor: '#2c3542',
                padding: 0.2,
                mb: 2
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: 185,
                overflow: 'hidden',
                objectFit: 'cover',
                objectPosition: '0% 60%',
                border: '#2c3542 1px solid',
                borderRadius: 1,
                backgroundColor: '#2c3542',
                padding: 0.2,
                mb: 2
              }}
            />
          )}
          <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Map */}
            <FormControl fullWidth
              sx={{
                '& .MuiInputLabel-root.Mui-focused': { color: '#e0e0e0' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e0e0e0' },
                  '&:hover fieldset': { borderColor: '#e0e0e0' },
                  '&.Mui-focused fieldset': { borderColor: '#e0e0e0' },
                },
                "& .MuiInputLabel-root": { color: "#e0e0e0" },
                "& .MuiSelect-select": { color: "#e0e0e0", fontSize: 16 },
                "& .MuiSelect-icon": { color: "#e0e0e0" },
              }}
            >
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
                {MAPS.map((i) => (
                  <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {matchData?.currMap.team1ban !== '' ? (
                <Box
                  component='img'
                  src={`/heroes/${matchData?.currMap.team1ban}.webp`}
                  sx={{
                    height: 55,
                    width: 55,
                    border: `${colourData.team1} 2px solid`,
                    borderRadius: 1,
                    backgroundColor: '#2c3542',
                    padding: 0.2
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    border: `${colourData.team1} 2px solid`,
                    borderRadius: 1,
                    backgroundColor: '#2c3542',
                    padding: 0.2
                  }}
                />
              )}

              {/* Team1Ban */}
              <FormControl fullWidth
                sx={{
                  width: 220,
                  '& .MuiInputLabel-root.Mui-focused': { color: '#e0e0e0' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: '#e0e0e0' },
                    '&.Mui-focused fieldset': { borderColor: '#e0e0e0' },
                  },
                  "& .MuiInputLabel-root": { color: "#e0e0e0" },
                  "& .MuiSelect-select": { color: "#e0e0e0", fontSize: 16 },
                  "& .MuiSelect-icon": { color: "#e0e0e0" },
                }}
              >
                <InputLabel id='Team1BanLabel'>{matchData.team1.name} ban</InputLabel>
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
                  {HEROES.map((i) => (
                    <MenuItem key={i} value={i}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {matchData?.currMap.team2ban !== '' ? (
                <Box
                  component='img'
                  src={`/heroes/${matchData?.currMap.team2ban}.webp`}
                  sx={{
                    height: 55,
                    width: 55,
                    border: `${colourData.team2} 2px solid`,
                    borderRadius: 1,
                    backgroundColor: '#2c3542',
                    padding: 0.2
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    border: `${colourData.team2} 2px solid`,
                    borderRadius: 1,
                    backgroundColor: '#2c3542',
                    padding: 0.2
                  }}
                />
              )}

              {/* Team2Ban */}
              <FormControl fullWidth
                sx={{
                  width: 220,
                  '& .MuiInputLabel-root.Mui-focused': { color: '#e0e0e0' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: '#e0e0e0' },
                    '&.Mui-focused fieldset': { borderColor: '#e0e0e0' },
                  },
                  "& .MuiInputLabel-root": { color: "#e0e0e0" },
                  "& .MuiSelect-select": { color: "#e0e0e0", fontSize: 16 },
                  "& .MuiSelect-icon": { color: "#e0e0e0" },
                }}
              >
                <InputLabel id='Team2BanLabel'>{matchData.team2.name} Ban</InputLabel>
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
                  {HEROES.map((i) => (
                    <MenuItem key={i} value={i}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <br/>

          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            <Button
              sx={{
                color: '#e0e0e0',
                backgroundColor: '#2a3340',
                padding: 1.5,
                border: `${colourData.team1} 2px solid`,
              }}
              disabled={matchData.team1.score >= matchData.ft || matchData.team2.score >= matchData.ft}
              onClick={ () => {
                if (matchData.currMap.map === '') return;

                setMatch((prev) => {
                  if (!prev) return prev;
                  if (matchData.team1.score >= matchData.ft || matchData.team2.score >= matchData.ft) return prev

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
              TEAM1 WON
            </Button>

            <Button
              sx={{
                color: '#e0e0e0',
                backgroundColor: '#2a3340',
                padding: 1.5,
                border: `${colourData.team2} 2px solid`,
              }}
              disabled={matchData.team1.score >= matchData.ft || matchData.team2.score >= matchData.ft}
              onClick={ () => {
                if (matchData.currMap.map === '') return;

                setMatch((prev) => {
                  if (!prev) return prev;
                  if (matchData.team1.score >= matchData.ft || matchData.team2.score >= matchData.ft) {return prev}

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
              TEAM2 WON
            </Button>

            <Button
              sx={{
                color: '#e0e0e0',
                backgroundColor: '#2a3340',
                padding: 1.5
              }}
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

          <br/>

          <Box sx={{ display: 'flex', flexDirection: 'column', height: 100, overflowY: 'scroll',
           '&::-webkit-scrollbar': {
              display: 'none',
            }, 
          }}>
            {matchData.prevMaps.map((map, index) => (
              <Box key={index}
                sx={{
                  backgroundColor: '#2c3542',
                  padding: 1,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  mb: 1.5,
                }}
              >
                <Box sx={{ display: 'flex', gap: 1.5}}>
                  <Typography
                    sx={{
                      backgroundColor: map.winner === 1 ? colourData.team1 : colourData.team2,
                      height: 55,
                      width: 55,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 1.5,
                      fontSize: 25,
                    }}
                  >{index + 1}</Typography>

                  <Box sx={{display: 'flex', alignItems: 'center', gap:1.5}}>
                    <Box
                      component='img'
                      src={`/maps/${map.map}.webp`}
                      sx={{
                        height: 55,
                        borderRadius: 1,
                        backgroundColor: '#2c3542',
                      }}
                    />
                    <Typography sx={{ width: 170}}>{map.map}</Typography>
                  </Box>
                </Box>
                
                <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
                  <Typography>Team1 ban: </Typography>
                  <Box
                    component='img'
                    src={`/heroes/${map.team1ban}.webp`}
                    sx={{
                      height: 55,
                      borderRadius: 1,
                      backgroundColor: '#2c3542',
                      border: `${colourData.team1} 3px solid`
                    }}
                  />
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
                  <Typography>Team2 ban: </Typography>
                  <Box
                    component='img'
                    src={`/heroes/${map.team2ban}.webp`}
                    sx={{
                      height: 55,
                      borderRadius: 1,
                      backgroundColor: '#2c3542',
                      border: `${colourData.team2} 3px solid`
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </TabPanel>

        {/* ############################ INTERMISSION TAB ################################# */}



        <TabPanel value={3} sx={{display: 'flex'}}>
          <Box>
            <ToggleButton
              value="check"
              selected={matchData.mapScreen}
              onChange={() => {
                setMatch((prev) => {
                if (!prev) return prev;

                const nextState = {
                  ...prev,
                  mapScreen: !prev.mapScreen,
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
              }}
            >
              Show maps and bans
            </ToggleButton>
          </Box>

          <ToggleButton
              value="check"
              selected={matchData.listenin.team1}
              onChange={() => {
                setMatch((prev) => {
                if (!prev) return prev;

                const nextState = {
                  ...prev,
                  listenin: { team1: !prev.listenin.team1, team2: false },
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
              }}
            >
              {matchData.team1.name} listen in
            </ToggleButton>

            <ToggleButton
              value="check"
              selected={matchData.listenin.team2}
              onChange={() => {
                setMatch((prev) => {
                if (!prev) return prev;

                const nextState = {
                  ...prev,
                  listenin: { team1: false, team2: !prev.listenin.team2 },
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
              }}
            >
              {matchData.team2.name} listen in
            </ToggleButton>
        </TabPanel>


          
        {/* ############################ COLOURS TAB ################################# */}



        <TabPanel value={4} sx={{display: 'flex'}}>
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
