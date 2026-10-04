/* eslint-disable prettier/prettier */
import { Casters } from '@common/caster.type';
import { Colours } from '@common/colours.type';
import { Match } from '@common/match.type';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    let isMounted = true;

    async function fetchState(): Promise<void> {
      try {
        const { match, colours, casters } = await window.stateAPI.getState();

        if (isMounted) {
          setMatch(match);
          setColours(colours);
          setCasters(casters);
        }
      } catch (e) {
        if (isMounted) {
          console.error('Failed fetch: ' + e);
        }
      }
    }

    fetchState();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!matchData || !colourData || !casterData) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <h1>Control panel</h1>

      <Button
        onClick={ updateScore }
      >
        TEAM1
      </Button>

      <pre>{JSON.stringify(matchData, null, 2)}</pre>
      <pre>{JSON.stringify(casterData, null, 2)}</pre>
      <pre>{JSON.stringify(colourData, null, 2)}</pre>
    </>
  )
}
