/* eslint-disable prettier/prettier */
import { Box, Button, Typography } from "@mui/material";
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
    <Box>
      <Button
        onClick={ () => {
          window.stateAPI.resetColours();
          fetchState();
        }}
      >
        RESET COLOURS
      </Button>
    
      <Box sx={{display: 'flex', gap: 5, mt: 3}}>
        <Box>
          <Typography>Team Colours</Typography>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
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
            <Typography>Team1: {colourData.team1}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
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
            <Typography>Team2: {colourData.team2}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
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
            <Typography>Team1 text: {colourData.team1Text}</Typography>
          </Box>
          
          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
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
            <Typography>Team2 text: {colourData.team2Text}</Typography>
          </Box>
        </Box>


        <Box>
          <Typography>Background Colours</Typography>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
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
            <Typography>Main: {colourData.main}</Typography>
          </Box>
          
          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
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
            <Typography>Secondary: {colourData.secondary}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
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
            <Typography>Accent: {colourData.accent}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
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
            <Typography>Tertiary: {colourData.matchStats}</Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}