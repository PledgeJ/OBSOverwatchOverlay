/* eslint-disable prettier/prettier */
import { Box, Typography } from '@mui/material';
import React from 'react'

interface cameraProp {
  caster: {url: string, name: string, handle: string};
  showText?: boolean;
  width: number;
  colour: string;
  index?: number;
}

export function Camera({
  caster,
  showText,
  width,
  colour,
  index = 0,
}: cameraProp): React.JSX.Element {

  return (
    <Box key={index}
      sx={{ backgroundColor: colour, 
        padding: '7px', borderRadius: 3,  width: width, 
        position: 'relative', transition: 'color 0.3s ease'
      }}
    >
      {caster.url != '' ? (
        <iframe
          src={caster.url}
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: 7, display: 'block', aspectRatio: '16/9' }}
        />
      ) : (
        <Box
          sx={{
            width: '100%', height: '100%',
            aspectRatio: '16/9'
          }}
        />
      )
      }

      <Box sx={{
        position: 'absolute', display: 'flex', gap: 2, bottom: 3, left: 5, py: 0.7, pl: 1.5, pr: 2,
        backgroundColor: colour, borderTopRightRadius: 10, borderBottomLeftRadius: 5, opacity: showText ? 100 : 0,
        transition: 'color 0.1s ease',
      }}>
        {caster.name != '' && <Typography sx={{ fontSize: 18 }}>{caster.name}</Typography>}
        {caster.handle != '' && <Typography sx={{ fontSize: 18 }}>{caster.handle != '' ? '@' : ''}{caster.handle}</Typography>}
      </Box>
    </Box>
  )
}