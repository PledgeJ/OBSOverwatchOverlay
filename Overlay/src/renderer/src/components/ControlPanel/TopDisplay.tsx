/* eslint-disable prettier/prettier */
import { Team } from "@common/match.type";
import { Box, Typography } from "@mui/material";
import React from "react";
import { FaMicrophone } from "react-icons/fa";

interface Side {
  team: Team
  ban: string
  colour: {team: string, text: string}
  listenin: boolean
}

interface DisplayProps {
  left: Side
  right: Side
}

export function TopDisplay({
  left,
  right,
}: DisplayProps ): React.JSX.Element {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
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
          <Typography variant='h5' sx={{width: 303, color: left.colour.text, transition: 'width 0.5s ease',}}>{left.team.name}</Typography>
        </Box>

        {/* Team1 Score */}
        <Box
          sx={{
            backgroundColor: `color-mix(in srgb, ${left.colour.team}, black 25%)`,
            height: 55,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 1,
            mr: 1
          }}
        >
          <Typography variant='h5' sx={{width: 55, color: left.colour.text, textAlign: 'center', fontSize: 40}}>{left.team.score}</Typography>
        </Box>
        
        {/* Team1 listen in */}
        <Box sx={{
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center', 
          padding: 1, 
          backgroundColor: left.colour.team, 
          borderRadius: 1,
          zIndex: -1,
          transform: left.listenin ? 'translateX(0)' : 'translateX(-50px)',
          transition: 'transform 0.3s ease',
        }}>
          <FaMicrophone size={25}/>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        {/* Team2 listen in */}
        <Box sx={{
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center', 
          padding: 1, 
          backgroundColor: right.colour.team, 
          borderRadius: 1,
          zIndex: -1,
          transform: right.listenin ? 'translateX(0)' : 'translateX(50px)',
          transition: 'transform 0.3s ease',
        }}>
          <FaMicrophone size={25}/>
        </Box>

        {/* Team2 Score */}
        <Box
          sx={{
            backgroundColor: `color-mix(in srgb, ${right.colour.team}, black 25%)`,
            height: 55,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 1,
            ml: 1
          }}
        >
          <Typography variant='h5' sx={{width: 55, color: right.colour.text, textAlign: 'center', fontSize: 40}}>{right.team.score}</Typography>
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
          <Typography variant='h5' sx={{width: 303, color: right.colour.text, textAlign: 'right', transition: 'width 0.5s ease',}}>{right.team.name}</Typography>
        </Box>
      </Box>
    </>
  )
}