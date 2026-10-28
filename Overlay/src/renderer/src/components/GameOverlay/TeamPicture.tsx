/* eslint-disable prettier/prettier */

import { Box } from "@mui/material";
import React from "react";

interface pictureProps {
  path: string;
  colour: string;
  type?: 'pic' | 'ban';
  side?: 'left' | 'right' | null;
  show?: boolean;
}

export function TeamPicture({
  path,
  colour,
  type = 'pic',
  side = null,
  show = true
}: pictureProps): React.JSX.Element {
  const check = path
  if (type == 'ban') { path = `/heroes/${path}.webp`}

  return (
    <Box
      sx={{
        height: 55, width: check !== '' && show ? 55 : 0,
        border: check !== '' && show ? `${colour} 2px solid`: 'none',
        borderRadius: 1,
        backgroundColor: `color-mix(in srgb, ${colour}, black 25%)`,
        padding: check !== '' && show ? 0.2 : 0,
        mr: check !== '' && side == 'left' && show ? 1 : 0,
        ml: check !== '' && side == 'right' && show ? 1 : 0,
        transition: 'width 0.5s ease, padding 0.5s ease, margin 0.5s ease, border-width 0.5s ease'
      }}
    >
      <Box
        component='img'
        src={check !== '' && show ? path : undefined}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: check !== '' && show ? 1 : 0,
          transition: check !== '' && show ? 'opacity 0.3s ease' : 'opacity 0 ease 0s',
        }}
      />
    </Box>
  )
}