/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

import type { Match } from '@common/match';

export default function GameOverlay(): React.JSX.Element {
  const [data, setData] = useState<Match | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    // Data comes in as { type: 'STATE_UPDATE', data: matchState }
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      switch (payload.type) {
        case 'STATE_UPDATE':
          setData(payload.data)
          console.log('Updated match state')
          break;
        default:
          console.log('Packet does not contain valid type')
      }
      
    };

    return () => ws.close();
  }, []);

  return (
    <>
      <h1>Game</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
