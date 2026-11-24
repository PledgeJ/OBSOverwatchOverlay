/* eslint-disable prettier/prettier */
import { Casters } from "@common/caster.type";
import { Box } from "@mui/material";
import React from "react";
import { Camera } from "../Camera";

interface cameraProp {
  casterData: Casters;
  colour: string;
  smallCam: boolean;
}

export function IntermissionCameraGrid({
  casterData,
  colour,
  smallCam,
}: cameraProp): React.JSX.Element {

  const mult = {1: 6, 2: 3, 3: 0, 4: 0.1, 5: 0, 6: 0};

  return (
    <>
      <Box
        sx={{
          width: '98vw',
          height: '80%',
          borderRadius: 1, mx: '1vw', mt: smallCam ? 2 : (casterData.casters.length == 2 || casterData.casters.length == 3) ? 25 : 7,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: !smallCam ? 4 : 1, flexWrap: 'wrap',
          alignContent: 'flex-start'
        }}
      >
       {casterData.casters.map((caster, index) => (
        <>
          <Camera 
            caster={{url: caster.camURL, name: caster.name, handle: caster.handle}} 
            showText={!smallCam}
            width={!smallCam ? 600 + (mult[casterData.casters.length] * 100) : 305}
            colour={colour}
            index={index}
          />
        </>
        ))}
      </Box>
    </>
  ) 
}