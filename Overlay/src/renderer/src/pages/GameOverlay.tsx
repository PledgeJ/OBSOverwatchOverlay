/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import type { Match } from '@common/match.type';
import type { Casters } from '@common/caster.type';
import type { Colours } from '@common/colours.type';
import { WS_Type } from '../../../types/enums';
import { Box, Typography } from '@mui/material';
import { FaMicrophone } from 'react-icons/fa';

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

  if (!matchData || !colourData || !casterData) {
    return <h1>Loading...</h1>
  }


  const slots: React.ReactNode[] = [];
  for (let i = 0; i < matchData.ft * 2 - 1; i++) {
    const item = matchData.prevMaps?.[i];
    const winner = item?.winner ?? -1;

    let col: string;
    let textCol: string;
    if (winner === 1) {
      col = colourData.team1;
      textCol = colourData.team1Text;
    }
    else if (winner === 2) {
      col = colourData.team2;
      textCol = colourData.team2Text;
    }
    else {
      col = '#e0e0e0';
      textCol = '#808080';
    }

    if (matchData.ft !== 1 || matchData.currMap.map === '') {
      slots.push(
        <Box key={i} sx={{ backgroundColor: col, width: '100%', textAlign: 'center', borderRadius: 1, color: textCol, opacity: winner !== -1 ? 1 : 0.3 }}>
          MAP{i + 1}
        </Box>
      );
    } else {
      let map: string;
      if  (matchData.prevMaps.length > 1) { map = matchData.prevMaps[0].map }
      else { map = matchData.currMap.map}
      slots.push(
        <Box sx={{ backgroundColor: col, width: '100%', textAlign: 'center', borderRadius: 1, color: textCol, opacity: winner !== -1 ? 1 : 0.4 }}>
          {map}
        </Box>
      );
      break;
    }
  }

  const left = matchData.isFlipped ? 
  { team: matchData.team2, ban: matchData.currMap.team2ban, colour: {team: colourData.team2, text: colourData.team2Text}, listenin: matchData.listenin.team2, picture: matchData.team2.picture } : 
  { team: matchData.team1, ban: matchData.currMap.team1ban, colour: {team: colourData.team1, text: colourData.team1Text}, listenin: matchData.listenin.team1, picture: matchData.team1.picture }; 

  const right = matchData.isFlipped ? 
  { team: matchData.team1, ban: matchData.currMap.team1ban, colour: {team: colourData.team1, text: colourData.team1Text}, listenin: matchData.listenin.team1, picture: matchData.team1.picture } :
  { team: matchData.team2, ban: matchData.currMap.team2ban, colour: {team: colourData.team2, text: colourData.team2Text}, listenin: matchData.listenin.team2, picture: matchData.team2.picture }; 

  return (
    <>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>


        {/* LHS */}
        <Box sx={{ mt: 4, ml: 5.4 }}>

          {/* Title */}
          <Box
            sx={{
              height: 30,
              width: 525,
              borderRadius: 1,
              mb: 0.5,
              backgroundColor: '#000000EB',
              display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between'
            }}
          >
            <Typography sx={{ pl: 1.5 }}>{matchData.title}</Typography>
            <Typography sx={{ pr: 1.5 }}>FT{matchData.ft}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center'}}>

            {/* Team1 Picture */}
            <Box
              sx={{
                height: 55, width: left.picture !== '' ? 55 : 0,
                border: left.picture !== '' ? `${left.colour.team} 2px solid`: 'none',
                borderRadius: 1,
                backgroundColor: `color-mix(in srgb, ${left.colour.team}, black 25%)`,
                padding: left.picture !== '' ? 0.2 : 0,
                mr: left.picture !== '' ? 1 : 0,
                transition: 'width 0.5s ease, padding 0.5s ease, margin 0.5s ease, border-width 0.5s ease'
              }}
            >
              <Box
                component='img'
                src={left.picture !== '' ? left.picture : undefined}
                sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: left.picture !== '' ? 1 : 0,
                transition: left.picture !== '' ? 'opacity 0.3s ease' : 'opacity 0 ease 0s',
              }}
              />
            </Box>

            {/* Team1 Name */}
            <Box
              sx={{
                backgroundColor: left.colour.team,
                height: 55,
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                borderRadius: 1,
                mr: 1
              }}
            >
              <Typography variant='h5' sx={{width: 303 + (left.ban === '' ? 63 : 0) + (left.picture === '' ? 63 : 0), color: left.colour.text, transition: 'width 0.5s ease',}}>{left.team.name}</Typography>
            </Box>

            {/* Team1 Ban */}
            <Box
              sx={{
                height: 55, width: left.ban !== '' ? 55 : 0,
                border: left.ban !== '' ? `${left.colour.team} 2px solid`: 'none',
                borderRadius: 1,
                backgroundColor: `color-mix(in srgb, ${left.colour.team}, black 25%)`,
                padding: left.ban !== '' ? 0.2 : 0,
                mr: left.ban !== '' ? 1 : 0,
                transition: 'width 0.5s ease, padding 0.5s ease, margin 0.5s ease, border-width 0.5s ease'
              }}
            >
              <Box
                component='img'
                src={left.ban !== '' ? `/heroes/${left.ban}.webp`: undefined}
                sx={{
                width: '100%',
                height: '100%',
                opacity: left.ban !== '' ? 1 : 0,
                transition: left.ban !== '' ? 'opacity 0.3s ease 0.3s' : 'opacity 0 ease 0s',
              }}
              />
            </Box>

            {/* Team1 Score */}
            <Box
              sx={{
                backgroundColor: `color-mix(in srgb, ${left.colour.team}, black 25%)`,
                height: 55,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1
              }}
            >
              <Typography variant='h5' sx={{width: 55, color: left.colour.text, textAlign: 'center', fontSize: 40}}>{left.team.score}</Typography>
            </Box>

            {/* Team1 listen in */}
            <Box sx={{ 
              width: 160,
              zIndex: -1,
              flexShrink: 0,
              overflow: 'hidden',
              transform: 'translateX(-10px)'
            }}>
              <Box sx={{
                height: 55, width: 140, 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                gap: 2,
                ml: '20px',
                backgroundColor: left.colour.team,
                borderRadius: 1,
                transition: 'transform 0.5s ease',
                transform: left.listenin ? 'translateX(0)' : 'translateX(-150px)',
              }}>
                <Typography>Listening</Typography>
                <FaMicrophone size={25}/>
              </Box>
            </Box>


          </Box>
        </Box>



        {/* ####################################################################################################### */}


        {/* RHS */}
        <Box sx={{mt: 4, mr: 5.4}}>

          {/* Maps */}
          <Box
            sx={{
              height: 30,
              width: 525,
              borderRadius: 1,
              mb: 0.5,
              display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 1,
              ml: 'auto'
            }}
          >
            {slots}
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center'}}>

            {/* Team2 listen in */}
            <Box sx={{ 
              width: 160,
              zIndex: -1,
              flexShrink: 0,
              overflow: 'hidden',
              transform: 'translateX(10px)'
            }}>
              <Box sx={{
                height: 55, width: 140, 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                gap: 2,
                mr: '20px',
                backgroundColor: right.colour.team,
                borderRadius: 1,
                transition: 'transform 0.5s ease',
                transform: right.listenin ? 'translateX(0)' : 'translateX(150px)',
              }}>
                <Typography>Listening</Typography>
                <FaMicrophone size={25}/>
              </Box>
            </Box>

            {/* Team2 Score */}
            <Box
              sx={{
                backgroundColor: `color-mix(in srgb, ${right.colour.team}, black 25%)`,
                height: 55,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1
              }}
            >
              <Typography variant='h5' sx={{width: 55, color: right.colour.text, textAlign: 'center', fontSize: 40}}>{right.team.score}</Typography>
            </Box>

            {/* Team2 Ban */}
            <Box
              sx={{
                height: 55, width: right.ban !== '' ? 55 : 0,
                border: right.ban !== '' ? `${right.colour.team} 2px solid`: 'none',
                borderRadius: 1,
                backgroundColor: `color-mix(in srgb, ${right.colour.team}, black 25%)`,
                padding: right.ban !== '' ? 0.2 : 0,
                ml: right.ban !== '' ? 1 : 0,
                transition: 'width 0.5s ease, padding 0.5s ease, margin 0.5s ease, border-width 0.5s ease'
              }}
            >
              <Box
                component='img'
                src={right.ban !== '' ? `/heroes/${right.ban}.webp`: undefined}
                sx={{
                width: '100%',
                height: '100%',
                opacity: right.ban !== '' ? 1 : 0,
                transition: right.ban !== '' ? 'opacity 0.3s ease 0.3s' : 'opacity 0 ease 0s',
              }}
              />
            </Box>

            {/* Team2 Name */}
            <Box
              sx={{
                backgroundColor: right.colour.team,
                height: 55,
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                borderRadius: 1,
                ml: 1
              }}
            >
              <Typography variant='h5' sx={{width: 303 + (right.ban === '' ? 63 : 0) + (right.picture === '' ? 63 : 0), color: right.colour.text, textAlign: 'right', transition: 'width 0.5s ease',}}>{right.team.name}</Typography>
            </Box>

            {/* Team2picture */}
            <Box
              sx={{
                height: 55, width: right.picture !== '' ? 55 : 0,
                border: right.picture !== '' ? `${right.colour.team} 2px solid`: 'none',
                borderRadius: 1,
                backgroundColor: `color-mix(in srgb, ${right.colour.team}, black 25%)`,
                padding: right.picture !== '' ? 0.2 : 0,
                ml: right.picture !== '' ? 1 : 0,
                transition: 'width 0.5s ease, padding 0.5s ease, margin 0.5s ease, border-width 0.5s ease'
              }}
            >
              <Box
                component='img'
                src={right.picture !== '' ? right.picture : undefined}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  opacity: right.picture !== '' ? 1 : 0,
                  transition: right.picture !== '' ? 'opacity 0.3s ease' : 'opacity 0 ease 0s',
                }}
              />
            </Box>
          </Box>
        </Box>


      </Box>
    </>
  )
}
