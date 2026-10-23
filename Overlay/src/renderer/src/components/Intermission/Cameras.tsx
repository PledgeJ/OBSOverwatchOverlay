/* eslint-disable prettier/prettier */
import { Casters } from "@common/caster.type";
import { Colours } from "@common/colours.type";
import { Box, Typography } from "@mui/material";
import React from "react";

interface cameraProp {
  casterData: Casters;
  colourData: Colours;
}

export function Cameras({
  casterData,
  colourData,
}: cameraProp): React.JSX.Element {

  const mult = {1: 6, 2: 3, 3: 0, 4: 0.1, 5: 0, 6: 0};

  return (
    <>
      <Box
        sx={{
          width: '98vw',
          height: '80%',
          borderRadius: 1, mx: '1vw', mt: casterData.casters.length == 2 || casterData.casters.length == 3 ? 25 : 5,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 4, flexWrap: 'wrap',
          alignContent: 'flex-start'
        }}
      >
       {casterData.casters.map((caster, index) => (
          <Box key={index}
            sx={{ backgroundColor: colourData.matchStats, 
              padding: 2.5, borderRadius: 3,  width: 600 + (mult[casterData.casters.length] * 100), 
              aspectRatio: '16/9.3', position: 'relative'
            }}
          >
            <iframe
              src={caster.camURL}
              allow="autoplay; fullscreen; picture-in-picture"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />

            <Box sx={{
              position: 'absolute', display: 'flex', gap: 2, bottom: 5, left: 10, p: 1, px: 3,
              backgroundColor: colourData.matchStats, borderTopRightRadius: 10,
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