/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import type { Match } from '@common/match.type';
import type { Casters } from '@common/caster.type';
import type { Colours } from '@common/colours.type';
import { WS_Type } from '../../../types/enums';
import { Box, Typography } from '@mui/material';

import { shortenMap } from "@renderer/models/MapList";
import { TeamPicture } from '@renderer/components/GameOverlay/TeamPicture';
import { ListenIn } from '@renderer/components/GameOverlay/ListenIn';

function getColours(colourData: Colours, winner: number): {col: string, textCol: string} {
  let col: string;
  let textCol: string;

  switch (winner) {
    case (1):
      col = colourData.team1;
      textCol = colourData.team1Text;
      break
    
    case(2):
      col = colourData.team2;
      textCol = colourData.team2Text;
      break

    default:
      col = '#e0e0e0';
      textCol = '#808080';
  }

  return {col, textCol}
}

function setSlots(matchData: Match, colourData: Colours): React.ReactNode[] {
  const slots: React.ReactNode[] = [];

  for (let i = 0; i < matchData.ft * 2 - 1; i++) {
    const item = matchData.prevMaps?.[i];
    const winner = item?.winner ?? -1;

    const { col, textCol } = getColours(colourData, winner);

    let map = '';
    if (item) { map = item.map }
    if (matchData.prevMaps.length === i) { map = matchData.currMap.map }

    if (map != '') {
      map = shortenMap(map);

      slots.push(
        <Box sx={{ backgroundColor: col, width: '100%', textAlign: 'center', borderRadius: 1, color: textCol, opacity: winner !== -1 || matchData.prevMaps.length === i ? 1 : 0.4 }}>
          {map}
        </Box>
      );
    } else {
      slots.push(
        <Box key={i} sx={{ backgroundColor: col, width: '100%', textAlign: 'center', borderRadius: 1, color: textCol, opacity: winner !== -1 ? 1 : 0.4 }}>
          MAP{i + 1}
        </Box>
      );
    }
  }

  return slots
}

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

  const slots = setSlots(matchData, colourData);

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
            <TeamPicture path={left.picture} colour={left.colour.team} side={'left'}/>

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
            <TeamPicture path={left.ban} colour={left.colour.team} type={'ban'} side={'left'}/>

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
            <ListenIn colour={left.colour.team} side={'left'} show={left.listenin}/>


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
            <ListenIn colour={right.colour.team} side={'right'} show={right.listenin}/>

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
            <TeamPicture path={right.ban} colour={right.colour.team} type={'ban'} side={'right'}/>

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
            <TeamPicture path={right.picture} colour={right.colour.team} side={'right'}/>
          </Box>
        </Box>

      </Box>
    </>
  )
}
