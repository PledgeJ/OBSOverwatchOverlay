/* eslint-disable prettier/prettier */
import { Colours } from "@common/colours.type";
import { Match } from "@common/match.type";
import { Box, Typography } from "@mui/material";
import React from "react";

interface StatProps {
  matchData: Match;
  colourData: Colours;
}

export function MatchStats({
  matchData, 
  colourData,
}: StatProps): React.JSX.Element {
  return (
    <>
      <Box
        sx={{
          display: 'flex', justifyContent: 'space-between', gap: 5, alignItems: 'center',
          backgroundColor: colourData.matchStats, padding: 5, py: 7, borderRadius: 3,
          mx: matchData.currMap.team1ban || matchData.currMap.team2ban ? 3 : 25,
          transition: 'margin 0.5s ease'
        }}
      >
        {/* LHS */}
        <Box sx={{display: 'flex', alignItems: 'center'}}>

          {/* Team1 Picture */}
          <Box
            sx={{
              height: 82.5, width: matchData.team1.picture !== '' ? 82.5 : 0,
              border: matchData.team1.picture !== '' ? `${colourData.team1} 2px solid`: 'none',
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
              transition: matchData.team1.picture !== '' ? 'opacity 0.3s ease' : 'opacity 0 ease 0s',
            }}
            />
          </Box>

          {/* Team1 Name */}
          <Box
            sx={{
              backgroundColor: colourData.team1,
              height: 82.5,
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              borderRadius: 1,
              mr: 1
            }}
          >
            <Typography variant='h5' sx={{fontSize: 37, width: 454.5 + (matchData.team1.picture === '' ? 94.5 : 0), color: colourData.team1Text, transition: 'width 0.5s ease',}}>{matchData.team1.name}</Typography>
          </Box>

          {/* Team1 Ban */}
          <Box
            sx={{
              height: 82.5, width: matchData.currMap.team1ban !== '' ? 195 : 0,
              border: matchData.currMap.team1ban !== '' ? `${colourData.team1} 2px solid`: 'none',
              borderRadius: 1,
              backgroundColor: `color-mix(in srgb, ${colourData.team1}, black 25%)`,
              padding: matchData.currMap.team1ban !== '' ? 0.2 : 0,
              mr: matchData.currMap.team1ban !== '' ? 1 : 0,
              transition: 'width 0.5s ease, padding 0.5s ease, margin 0.5s ease, border-width 0.5s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}
          >

            <Typography sx={{ml: 1.5, fontSize: 22}}>{matchData.currMap.firstban == 1 ? '1st Ban:' : '2nd Ban'}</Typography>
            <Box
              component='img'
              src={matchData.currMap.team1ban !== '' ? `/heroes/${matchData.currMap.team1ban}.webp`: undefined}
              sx={{
              width: 'auto',
              height: '100%',
              opacity: matchData.currMap.team1ban !== '' ? 1 : 0,
              transition: matchData.currMap.team1ban !== '' ? 'opacity 0.3s ease 0.3s' : 'opacity 0 ease 0s',
            }}
            />
          </Box>

          {/* Team1 Score */}
          <Box
            sx={{
              backgroundColor: `color-mix(in srgb, ${colourData.team1}, black 25%)`,
              height: 82.5,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 1
            }}
          >
            <Typography variant='h5' sx={{width: 82.5, color: colourData.team1Text, textAlign: 'center', fontSize: 50}}>{matchData.team1.score}</Typography>
          </Box>
        </Box>



        {/* ####################################################################################################### */}


        {/* RHS */}
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          {/* Team2 Score */}
          <Box
            sx={{
              backgroundColor: `color-mix(in srgb, ${colourData.team2}, black 25%)`,
              height: 82.5,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 1
            }}
          >
            <Typography variant='h5' sx={{width: 82.5, color: colourData.team2Text, textAlign: 'center', fontSize: 50}}>{matchData.team2.score}</Typography>
          </Box>

          {/* Team2 Ban */}
          <Box
            sx={{
              height: 82.5, width: matchData.currMap.team2ban !== '' ? 195 : 0,
              border: matchData.currMap.team2ban !== '' ? `${colourData.team2} 2px solid`: 'none',
              borderRadius: 1,
              backgroundColor: `color-mix(in srgb, ${colourData.team2}, black 25%)`,
              padding: matchData.currMap.team2ban !== '' ? 0.2 : 0,
              ml: matchData.currMap.team2ban !== '' ? 1 : 0,
              transition: 'width 0.5s ease, padding 0.5s ease, margin 0.5s ease, border-width 0.5s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}
          >
            <Typography sx={{ml: 1.5, fontSize: 22}}>{matchData.currMap.firstban == 2 ? '1st Ban:' : '2nd Ban'}</Typography>
            <Box
              component='img'
              src={matchData.currMap.team2ban !== '' ? `/heroes/${matchData.currMap.team2ban}.webp`: undefined}
              sx={{
              width: 'auto',
              height: '100%',
              opacity: matchData.currMap.team2ban !== '' ? 1 : 0,
              transition: matchData.currMap.team2ban !== '' ? 'opacity 0.3s ease 0.3s' : 'opacity 0 ease 0s',
            }}
            />
          </Box>

          {/* Team2 Name */}
          <Box
            sx={{
              backgroundColor: colourData.team2,
              height: 82.5,
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              borderRadius: 1,
              ml: 1
            }}
          >
            <Typography variant='h5' sx={{fontSize: 37, width: 454.5 + (matchData.team2.picture === '' ? 94.5 : 0), color: colourData.team2Text, textAlign: 'right', transition: 'width 0.5s ease',}}>{matchData.team2.name}</Typography>
          </Box>

          {/* Team2picture */}
          <Box
            sx={{
              height: 82.5, width: matchData.team2.picture !== '' ? 82.5 : 0,
              border: matchData.team2.picture !== '' ? `${colourData.team2} 2px solid`: 'none',
              borderRadius: 1,
              backgroundColor: `color-mix(in srgb, ${colourData.team2}, black 25%)`,
              padding: matchData.team2.picture !== '' ? 0.2 : 0,
              ml: matchData.team2.picture !== '' ? 1 : 0,
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
                transition: matchData.team2.picture !== '' ? 'opacity 0.3s ease' : 'opacity 0 ease 0s',
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}