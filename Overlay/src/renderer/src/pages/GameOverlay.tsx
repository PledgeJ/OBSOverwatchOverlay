/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

import type { Match } from '@common/match.type';
import type { Casters } from '@common/caster.type';
import type { Colours } from '@common/colours.type';
import { WS_Type } from '../../../types/enums';
import { Box } from '@mui/material';

export default function GameOverlay(): React.JSX.Element {
  const [matchData, setMatchData] = useState<Match | null>(null);
  const [casterData, setCasterData] = useState<Casters | null>(null);
  const [colourData, setColourData] = useState<Colours | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    // Data comes in as { type: 'STATE_UPDATE', data: matchState }
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      switch (payload.type) {
        case WS_Type.STATE_UPDATE:
          setMatchData(payload.data);
          console.log('Updated match state');
          break;

        case WS_Type.CASTER_UPDATE:
          setCasterData(payload.data);
          console.log('Updated caster state');
          break;

        case WS_Type.COLOUR_UPDATE:
          setColourData(payload.data);
          console.log('Updated colour state');
          break;

        default:
          console.log('Packet does not contain valid type');
      }
      
    };

    return () => ws.close();
  }, []);

  return (
    <>
      <h1>Game</h1>

      <Box
        component='img'
        src={`/heroes/${matchData?.currMap.team1ban}.webp`}
      />

      <Box
        component='img'
        src={`/heroes/${matchData?.currMap.team2ban}.webp`}
      />

      <Box
        component='img'
        src={`/maps/${matchData?.currMap.map}.webp`}
      />

      <pre>{JSON.stringify(matchData, null, 2)}</pre>
      <pre>{JSON.stringify(casterData, null, 2)}</pre>
      <pre>{JSON.stringify(colourData, null, 2)}</pre>
    </>
  )
}
