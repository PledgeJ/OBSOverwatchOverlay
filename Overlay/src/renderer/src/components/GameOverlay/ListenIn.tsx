/* eslint-disable prettier/prettier */

import { Box, Typography } from "@mui/material";
import React from "react";
import { FaMicrophone } from "react-icons/fa";

interface listenProps {
  colour: string;
  side?: 'left' | 'right';
  show: boolean
}

export function ListenIn({
  colour,
  side,
  show,
}: listenProps): React.JSX.Element {
  let sideMult: number = 1;
  if (side == 'left') {sideMult = -1}

  return (
    <Box sx={{ 
      width: 160,
      zIndex: -1,
      flexShrink: 0,
      overflow: 'hidden',
      transform: `translateX(${sideMult * 10}px)`
    }}>
      <Box sx={{
        height: 55, width: 140, 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        gap: 2,
        ml: side == 'left' ? '20px' : 0,
        mr: side == 'right' ? '20px' : 0,
        backgroundColor: colour,
        borderRadius: 1,
        transition: 'transform 0.5s ease',
        transform: show ? 'translateX(0)' : `translateX(${sideMult * 150}px)`,
      }}>
        <Typography>Listening</Typography>
        <FaMicrophone size={25}/>
      </Box>
    </Box>
  )
}