/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

import type { Match } from '@common/match.type';
import { WS_Type } from '../../../types/enums';
import { Casters } from '@common/caster.type';
import { Colours } from '@common/colours.type';
import { Box, Typography } from '@mui/material';
import { Cameras } from '@renderer/components/Cameras';

export default function IntermissionOverlay(): React.JSX.Element {
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

  if (!matchData || !colourData || !casterData) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      {/* Background */}
      <Box 
        sx={{ 
          width: '100vw', height: '100vh', 
          background: `linear-gradient(
            135deg,
            ${colourData.main} 0% 55%,
            ${colourData.accent} 55% 60%,
            ${colourData.secondary} 60% 100%
          )`
        }}
      >
        <Cameras casterData={casterData} />

        
      </Box>

      {/* 
        Notes:
          - If the map and ban screen is open, don't show the popup for new ban and map
      */}
    </>
  )
}
