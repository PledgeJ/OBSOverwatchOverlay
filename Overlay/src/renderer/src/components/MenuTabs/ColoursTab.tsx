/* eslint-disable prettier/prettier */
import { Box, Button } from "@mui/material";
import React from "react";
import { Colours } from "@common/colours.type";

interface ColourProps {
  colourData: Colours;
  setColours: React.Dispatch<React.SetStateAction<Colours | null>>;
  fetchState: () => Promise<void>;
}


export function ColoursTab({
  colourData,
  fetchState,
  setColours,
}: ColourProps): React.JSX.Element {
  return (
    <>
      <Box>
        <Button
          onClick={ () => {
            window.stateAPI.resetColours();
            fetchState();
          }}
        >
          RESET COLOURS
        </Button>

        {/* Team 1 colour */}
        <input 
          type='color'
          value={colourData.team1}
          onChange={(e) => {
            const newVal = e.target.value;

            setColours((prev) => {
            if (!prev) return null;

            const nextState = {
              ...prev,
              team1: newVal,
            };

            window.stateAPI.setColour(nextState);
            return nextState;
          });
          }}
        />

        {/* Team 2 colour */}
        <input 
          type='color'
          value={colourData.team2}
          onChange={(e) => {
            const newVal = e.target.value;

            setColours((prev) => {
            if (!prev) return null;

            const nextState = {
              ...prev,
              team2: newVal,
            };

            window.stateAPI.setColour(nextState);
            return nextState;
          });
          }}
        />

        {/* Team 1 text */}
        <input 
          type='color'
          value={colourData.team1Text}
          onChange={(e) => {
            const newVal = e.target.value;

            setColours((prev) => {
            if (!prev) return null;

            const nextState = {
              ...prev,
              team1Text: newVal,
            };

            window.stateAPI.setColour(nextState);
            return nextState;
          });
          }}
        />

        {/* Team 2 text */}
        <input 
          type='color'
          value={colourData.team2Text}
          onChange={(e) => {
            const newVal = e.target.value;

            setColours((prev) => {
            if (!prev) return null;

            const nextState = {
              ...prev,
              team2Text: newVal,
            };

            window.stateAPI.setColour(nextState);
            return nextState;
          });
          }}
        />

        <br/>

        {/* BG Main */}
        <input 
          type='color'
          value={colourData.main}
          onChange={(e) => {
            const newVal = e.target.value;

            setColours((prev) => {
            if (!prev) return null;

            const nextState = {
              ...prev,
              main: newVal,
            };

            window.stateAPI.setColour(nextState);
            return nextState;
          });
          }}
        />

        {/* BG Secondary */}
        <input 
          type='color'
          value={colourData.secondary}
          onChange={(e) => {
            const newVal = e.target.value;

            setColours((prev) => {
            if (!prev) return null;

            const nextState = {
              ...prev,
              secondary: newVal,
            };

            window.stateAPI.setColour(nextState);
            return nextState;
          });
          }}
        />

        {/* BG Accent */}
        <input 
          type='color'
          value={colourData.accent}
          onChange={(e) => {
            const newVal = e.target.value;

            setColours((prev) => {
            if (!prev) return null;

            const nextState = {
              ...prev,
              accent: newVal,
            };

            window.stateAPI.setColour(nextState);
            return nextState;
          });
          }}
        />

        {/* Match Stats */}
        <input 
          type='color'
          value={colourData.matchStats}
          onChange={(e) => {
            const newVal = e.target.value;

            setColours((prev) => {
            if (!prev) return null;

            const nextState = {
              ...prev,
              matchStats: newVal,
            };

            window.stateAPI.setColour(nextState);
            return nextState;
          });
          }}
        />

      </Box>

      <pre>{JSON.stringify(colourData, null, 2)}</pre>
    </>
  )
}