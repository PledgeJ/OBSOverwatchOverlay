/* eslint-disable prettier/prettier */
import { Colours } from "@common/colours.type";
import { Match } from "@common/match.type";
import { Box, Typography } from "@mui/material";
import React from "react";
import { TeamPicture } from "../GameOverlay/TeamPicture";

interface mabProps {
  matchData: Match;
  colourData: Colours;
}

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
      col = '#000000';
      textCol = '#808080';
  }

  return {col, textCol}
}

function setSlots(matchData: Match, colourData: Colours): React.ReactNode[] {
  const slots: React.ReactNode[] = []

  for (let i = 0; i < matchData.ft * 2 - 1; i++) {
    const item = matchData.prevMaps?.[i];
    const winner = item?.winner ?? -1;

    const { col, textCol } = getColours(colourData, winner)

    let map = ''
    let ban1 = ''
    let ban2 = ''
    let firstBan = -1
    
    if (item) { 
      map = item.map
      ban1 = item.team1ban
      ban2 = item.team2ban
      firstBan = item.firstban
    }
    else if (matchData.prevMaps.length === i) { 
      map = matchData.currMap.map 
      ban1 = matchData.currMap.team1ban
      ban2 = matchData.currMap.team2ban
      firstBan = matchData.currMap.firstban
    }

    slots.push(
      <Box sx={{position: 'relative', width: '100%', height: matchData.mapScreen ? 630 : 0, maxWidth: 900, bgcolor: col, opacity: map ? 1 : 0.5, borderRadius: 3, border: `7px solid ${col}`,
        transition: 'height 0.3s ease-in-out, bgColor 0.3s ease-in-out'
      }}>
        <Box
          component='img'
          src={map ? `/maps/${map}.webp` : undefined}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 1,
            objectFit: 'cover',
            opacity: !map ? 0 : !item ? 1 : 0.6,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />

        {matchData.mapScreen && <>
        <Box sx={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', bottom: 20, gap: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', scale: 1.2 }}>
            {(firstBan != -1 && ban1 != '') && <Typography sx={{bgcolor: colourData.team1, p: 1, fontSize: 20, color: textCol}}>{firstBan == 1 ? '1st' : firstBan == 2? '2nd' : ''}</Typography>}
            <TeamPicture path={`/heroes/${ban1}.webp`} colour={colourData.team1} side={"left"} show={ban1 != ''}/>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', scale: 1.2 }}>
            <TeamPicture path={`/heroes/${ban2}.webp`} colour={colourData.team2} side={"right"} show={ban2 != ''}/>
            {(firstBan != -1 && ban2 != '') && <Typography sx={{bgcolor: colourData.team2, p: 1, fontSize: 20, color: textCol }}>{firstBan == 2 ? '1st' : '2nd'}</Typography>}
          </Box>
        </Box>

        <Box sx={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', bottom: 270, gap: 3 }}>
          {(winner != -1 && matchData.team1.picture && matchData.team2.picture) && <Box
            component='img'
            src={winner == 1 ? matchData.team1.picture : winner == 2 ? matchData.team2.picture : undefined}
            sx={{
              width: 130,
              height: 130,
              bgcolor: `color-mix(in srgb, ${col}, black 25%)`,
              border: winner != -1 ? `4px solid ${col}` : 'transparent',
              borderRadius: 1,
              objectFit: 'cover',
              opacity: winner != -1 ? 1 : 0,
              transition: '0.5s opacity 0.5s ease-in-out'
            }}
          />}
        </Box>
        </>}

      </Box>
    )
  }

  return slots
}

export function MapsAndBans({
  matchData,
  colourData,
}: mabProps): React.JSX.Element {
  const slots: React.ReactNode[] = setSlots(matchData, colourData)

  return(
    <Box sx={{ display: 'flex', width: '100%', gap: 5, mx: 3, justifyContent: 'center' }}>
      {slots}
    </Box>
  )
}