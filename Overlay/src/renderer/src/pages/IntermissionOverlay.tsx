/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

import type { Match } from '@common/match.type';
import { WS_Type } from '../../../types/enums';

export default function IntermissionOverlay(): React.JSX.Element {
  const [data, setData] = useState<Match | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    // Data comes in as { type: WS_Type.STATE_UPDATE, data: matchState }
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      switch (payload.type) {
        case WS_Type.STATE_UPDATE:
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
      <h1>Intermission</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
