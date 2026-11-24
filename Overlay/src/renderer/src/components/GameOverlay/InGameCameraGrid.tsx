/* eslint-disable prettier/prettier */
import { Casters } from '@common/caster.type';
import { Box } from '@mui/material';
import React from 'react'
import { Camera } from '../Camera';

interface cameraProp {
  casterData: Casters;
  colour: string;
  showCam: boolean;
  camSize: number;
}

export function InGameCameraGrid({
  casterData,
  colour,
  showCam,
  camSize,
}: cameraProp): React.JSX.Element {

  return (
    <>
      <Box
        sx={{
          width: showCam ? '100%' : '200%', px: 2,
          height: '100%', pt: 30,
          display: 'grid', gridTemplateRows: 'repeat(3, auto)', gridTemplateColumns: 'repeat(2, auto)',
          justifyContent: 'space-between', gap: 2,
          transition: 'all 0.5s ease'
        }}
      >
       {casterData.casters.map((caster, index) => (
        <>
          <Camera 
            caster={{url: caster.camURL, name: caster.name, handle: caster.handle}} 
            width={camSize}
            colour={colour}
            index={index}
          />
        </>
        ))}
      </Box>
    </>
  )
}
