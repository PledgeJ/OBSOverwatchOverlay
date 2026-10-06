/* eslint-disable prettier/prettier */
import { Casters } from '@common/caster.type';
import { Colours } from '@common/colours.type';
import { Match } from '@common/match.type';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function ControlPanel(): React.JSX.Element {

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

      <Button
        onClick={ () => {
          window.stateAPI.resetColours();
          fetchState();
        }}
      >
        RESET COLOURS
      </Button>

      <Button
        onClick={ () => {
          window.stateAPI.resetCasters();
          fetchState();
        }}
      >
        RESET CASTERS
      </Button>

      {/* Team1 input */}
      <TextField 
        id="outlined-basic"
        label="Team1"
        variant="outlined"
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

      <pre>{JSON.stringify(matchData, null, 2)}</pre>
      <pre>{JSON.stringify(casterData, null, 2)}</pre>
      <pre>{JSON.stringify(colourData, null, 2)}</pre>
    </>
  )
}
