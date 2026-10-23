/* eslint-disable prettier/prettier */
import { Casters } from "@common/caster.type";
import { Box, Typography } from "@mui/material";
import React from "react";

interface cameraProp {
  casterData: Casters;
  colour: string;
  mapScreen: boolean;
}

export function Cameras({
  casterData,
  colour,
  mapScreen,
}: cameraProp): React.JSX.Element {

  const mult = {1: 6, 2: 3, 3: 0, 4: 0.1, 5: 0, 6: 0};

  return (
    <>
      <Box
        sx={{
          width: '98vw',
          height: '80%',
          borderRadius: 1, mx: '1vw', mt: mapScreen ? 2 : (casterData.casters.length == 2 || casterData.casters.length == 3) ? 25 : 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: !mapScreen ? 4 : 1, flexWrap: 'wrap',
          alignContent: 'flex-start', transition: 'all 0.3s ease'
        }}
      >
       {casterData.casters.map((caster, index) => (
          <Box key={index}
            sx={{ backgroundColor: colour, 
              padding: !mapScreen ? 2.5 : 1.2, borderRadius: 3,  width: !mapScreen ? 600 + (mult[casterData.casters.length] * 100) : 305, 
              aspectRatio: '16/9.3', position: 'relative', transition: 'all 0.3s ease'
            }}
          >
            <iframe
              src={caster.camURL}
              allow="autoplay; fullscreen; picture-in-picture"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />

            <Box sx={{
              position: 'absolute', display: 'flex', gap: 2, bottom: 5, left: 10, p: 1, px: 3,
              backgroundColor: colour, borderTopRightRadius: 10, opacity: !mapScreen ? 100 : 0,
              transition: 'all 0.1s ease',
            }}>
              {caster.name != '' && <Typography sx={{ fontSize: 25 }}>{caster.name}</Typography>}
              {caster.handle != '' && <Typography sx={{ fontSize: 25 }}>{caster.handle != '' ? '@' : ''}{caster.handle}</Typography>}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  ) 
}