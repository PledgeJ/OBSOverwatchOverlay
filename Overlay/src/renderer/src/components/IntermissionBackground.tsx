/* eslint-disable prettier/prettier */

import { Colours } from "@common/colours.type";
import { Box } from "@mui/material";
import React from "react";

interface backgroundProps {
  colourData: Colours;
}

export function IntermissionBackground({
  colourData
}: backgroundProps): React.JSX.Element {
  return (
    <>
      <Box
        sx={{
          w: 1000, h: 1000,
          backgroundColor: colourData.main
        }}
      >
        Hello
      </Box>
    </>
  )
}