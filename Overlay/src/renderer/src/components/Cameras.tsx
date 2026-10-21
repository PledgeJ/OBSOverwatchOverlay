/* eslint-disable prettier/prettier */
import { Casters } from "@common/caster.type";
import { Box, Typography } from "@mui/material";
import React from "react";

interface cameraProp {
  casterData: Casters
}

export function Cameras({
  casterData,
}: cameraProp): React.JSX.Element {

  const mult = {1: 6, 2: 3, 3: 1, 4: 1, 5: 0, 6: 0};

  return (
    <>
      <Box
        sx={{
          height: '40vh',
          width: '98vw',
          borderRadius: 1,
          mb: 0.5, mx: '1vw', mt: 5,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 4, flexWrap: 'wrap'
        }}
      >
       {casterData.casters.map((caster, index) => (
          <Box key={index}
            sx={{ backgroundColor: '#2c3542', padding: 2.5, borderRadius: 3,  width: 600 + (mult[casterData.casters.length] * 100), aspectRatio: '16/9' }}
          />
        ))}
      </Box>
    </>
  ) 
}