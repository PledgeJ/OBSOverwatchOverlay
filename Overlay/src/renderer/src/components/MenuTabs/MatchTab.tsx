/* eslint-disable prettier/prettier */
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { Match } from "@common/match.type";
import { Colours } from "@common/colours.type";
import { MAPS } from "@renderer/models/MapList";
import { HEROES } from "@renderer/models/HeroList";

interface MatchProps {
  matchData: Match;
  colourData: Colours;
  setMatch: React.Dispatch<React.SetStateAction<Match | null>>;
  fetchState: () => Promise<void>;
}


export function MatchTab({
  matchData,
  colourData,
  setMatch,
  fetchState,
}: MatchProps): React.JSX.Element {
  return (
    <>
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
    </>
  )
}