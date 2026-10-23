/* eslint-disable prettier/prettier */
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { UserInput } from "../ControlPanel/UserInput";
import { Match } from "@common/match.type";
import { Colours } from "@common/colours.type";
import { Casters } from "@common/caster.type";

interface InitialInfoProps {
  matchData: Match;
  colourData: Colours;
  casterData: Casters;
  setMatch: React.Dispatch<React.SetStateAction<Match | null>>;
  setCasters: React.Dispatch<React.SetStateAction<Casters | null>>;
  fetchState: () => Promise<void>;
}


export function InitialInfo({
  matchData,
  colourData,
  casterData,
  setMatch,
  setCasters,
  fetchState,
}: InitialInfoProps): React.JSX.Element {
  return (
    <>
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

      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            height: 80, width: 80,
            border: `${colourData.team1} 2px solid`,
            borderRadius: 1,
            backgroundColor: `color-mix(in srgb, ${colourData.team1}, black 25%)`,
            padding: matchData.team1.picture !== '' ? 0.2 : 0,
            mr: matchData.team1.picture !== '' ? 1 : 0,
            transition: 'width 0.5s ease, padding 0.5s ease, margin 0.5s ease, border-width 0.5s ease'
          }}
        >
          <Box
            component='img'
            src={matchData.team1.picture !== '' ? matchData.team1.picture : undefined}
            sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: matchData.team1.picture !== '' ? 1 : 0,
            transition: matchData.team1.picture !== '' ? 'opacity 0.3s ease 0.3s' : 'opacity 0 ease 0s',
          }}
          />
        </Box>

        <Button
          onClick={async () => {

            const filePath = await window.utils.openFile();

            if (filePath) {
              setMatch((prev) => {
                if (!prev) return prev;

                const nextState = {
                  ...prev,
                  team1: {...prev.team1, picture: filePath}
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }
          }}
        >
          Browse
        </Button>

        <Button
          onClick={() => {
            setMatch((prev) => {
              if (!prev) return prev;

              const nextState = {
                ...prev,
                team1: {...prev.team1, picture: ''}
              };

              window.stateAPI.setMatch(nextState);
              return nextState;
            });
          }}
        >
          Clear
        </Button>

        <Box
          sx={{
            height: 80, width: 80,
            border: `${colourData.team2} 2px solid`,
            borderRadius: 1,
            backgroundColor: `color-mix(in srgb, ${colourData.team2}, black 25%)`,
            padding: matchData.team2.picture !== '' ? 0.2 : 0,
            mr: matchData.team2.picture !== '' ? 1 : 0,
            transition: 'width 0.5s ease, padding 0.5s ease, margin 0.5s ease, border-width 0.5s ease'
          }}
        >
          <Box
            component='img'
            src={matchData.team2.picture !== '' ? matchData.team2.picture : undefined}
            sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: matchData.team2.picture !== '' ? 1 : 0,
            transition: matchData.team2.picture !== '' ? 'opacity 0.3s ease 0.3s' : 'opacity 0 ease 0s',
          }}
          />
        </Box>

        <Button
          onClick={async () => {

            const filePath = await window.utils.openFile();

            if (filePath) {
              setMatch((prev) => {
                if (!prev) return prev;

                const nextState = {
                  ...prev,
                  team2: {...prev.team2, picture: filePath}
                };

                window.stateAPI.setMatch(nextState);
                return nextState;
              });
            }
          }}
        >
          Browse
        </Button>

        <Button
          onClick={() => {
            setMatch((prev) => {
              if (!prev) return prev;

              const nextState = {
                ...prev,
                team2: {...prev.team2, picture: ''}
              };

              window.stateAPI.setMatch(nextState);
              return nextState;
            });
          }}
        >
          Clear
        </Button>
      </Box>
      
      <br/>
      <br/>

      <Box>
        <Button
          onClick={ () => {
            setCasters((prev) => {
              if (!prev || prev.number + 1 > 6) return prev;

              const nextState = {
                number: prev.number + 1,
                casters: [...prev.casters, {name: `Name`, handle: `Handle`, camURL: ''}]
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

        <Typography>(See connection dropdown for more information on caster cameras)</Typography>
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

            <UserInput 
              width={330}
              maxLength={300}
              label='VDO.ninja cam URL'
              value={caster.camURL}
              onChange={(value) => {
                setCasters((prev) => {
                  if (!prev) return null;

                  const updatedCasters = prev.casters.map((c, i) => {
                    if (i == index) {
                      return { ...c, camURL: value }
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
    </>
  )
}