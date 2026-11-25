/* eslint-disable prettier/prettier */
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Colours } from "@common/colours.type";
import { Default, Default_InGame, Default_Team, Pink_InGame, UoN } from "@renderer/models/ColourPresets";

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
  function applyPreset(preset): void {
    setColours((prev) => {
      if (!prev) return null;

      const nextState = {
        ...prev,
        ...preset,
      }

      window.stateAPI.setColour(nextState);
      return nextState;
    });
  }

  function applyColourChange(change): void {
    setColours((prev) => {
      if (!prev) return null;

      const nextState = {
        ...prev,
        ...change
      };

      window.stateAPI.setColour(nextState);
      return nextState;
    });
  }

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={ () => {
            window.stateAPI.resetColours();
            fetchState();
          }}
        >
          Reset ALL Colours
        </Button>

        <Button onClick={ () => applyPreset(Default_Team) }>Reset Team Colours</Button>
      </Box>

      <br/>
      
      <Box sx={{ display: "flex", gap: 5 }}>
        <Box>
          <Typography>Background Presets</Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button onClick={ () => applyPreset(Default) }>Default</Button>
            
            <Button onClick={ () => applyPreset(UoN) }>UoN</Button>
          </Box>
        </Box>

        <Box>
          <Typography>In Game Presets</Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button onClick={ () => applyPreset(Default_InGame) }>Default</Button>
            
            <Button onClick={ () => applyPreset(Pink_InGame) }>Blue and Pink</Button>
          </Box>
        </Box>
      </Box>
    
      <Box sx={{display: 'flex', gap: 10, mt: 3}}>
        <Box sx={{width: 230}}>
          <Typography>Team Colours</Typography>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* Team 1 colour */}
            <input 
              type='color'
              value={colourData.team1}
              onChange={(e) => { applyColourChange({team1: e.target.value}) }}
            />
            <Typography>Team1: {colourData.team1}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* Team 1 text */}
            <input 
              type='color'
              value={colourData.team1Text}
              onChange={(e) => { applyColourChange({team1Text: e.target.value}) }}
            />
            <Typography>Team1 text: {colourData.team1Text}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* Team 2 colour */}
            <input 
              type='color'
              value={colourData.team2}
              onChange={(e) => { applyColourChange({team2: e.target.value}) }}
            />
            <Typography>Team2: {colourData.team2}</Typography>
          </Box>
          
          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* Team 2 text */}
            <input 
              type='color'
              value={colourData.team2Text}
              onChange={(e) => { applyColourChange({team2Text: e.target.value}) }}
            />
            <Typography>Team2 text: {colourData.team2Text}</Typography>
          </Box>
        </Box>


        <Box sx={{width: 230}}>
          <Typography>Background Colours</Typography>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* BG Main */}
            <input 
              type='color'
              value={colourData.main}
              onChange={(e) => { applyColourChange({main: e.target.value}) }}
            />
            <Typography>Main: {colourData.main}</Typography>
          </Box>
          
          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* BG Secondary */}
            <input 
              type='color'
              value={colourData.secondary}
              onChange={(e) => { applyColourChange({secondary: e.target.value}) }}
            />
            <Typography>Secondary: {colourData.secondary}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* BG Accent */}
            <input 
              type='color'
              value={colourData.accent}
              onChange={(e) => { applyColourChange({accent: e.target.value}) }}
            />
            <Typography>Accent: {colourData.accent}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* Match Stats */}
            <input 
              type='color'
              value={colourData.matchStats}
              onChange={(e) => { applyColourChange({matchStats: e.target.value}) }}
            />
            <Typography>Tertiary: {colourData.matchStats}</Typography>
          </Box>
        </Box>

        <Box sx={{width: 230}}>
          <Typography>In Game</Typography>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* In Game team 1 */}
            <input 
              type='color'
              value={colourData.inGame.team1}
              onChange={(e) => {
                const newVal = e.target.value;

                setColours((prev) => {
                  if (!prev) return null;

                  const nextState = {
                    ...prev,
                    inGame: {...prev.inGame, team1: newVal},
                  };

                  window.stateAPI.setColour(nextState);
                  return nextState;
                });
              }}
            />
            <Typography>Team1: {colourData.inGame.team1}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* In Game text team1 */}
            <input 
              type='color'
              value={colourData.inGame.team1Text}
              onChange={(e) => {
                const newVal = e.target.value;

                setColours((prev) => {
                  if (!prev) return null;

                  const nextState = {
                    ...prev,
                    inGame: {...prev.inGame, team1Text: newVal},
                  };

                  window.stateAPI.setColour(nextState);
                  return nextState;
                });
              }}
            />
            <Typography>Team1 text: {colourData.inGame.team1Text}</Typography>
          </Box>
            
          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* In Game team 2 */}
            <input 
              type='color'
              value={colourData.inGame.team2}
              onChange={(e) => {
                const newVal = e.target.value;

                setColours((prev) => {
                  if (!prev) return null;

                  const nextState = {
                    ...prev,
                    inGame: {...prev.inGame, team2: newVal},
                  };

                  window.stateAPI.setColour(nextState);
                  return nextState;
                });
              }}
            />
            <Typography>Team2: {colourData.inGame.team2}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center', gap:1}}>
            {/* In Game text team2 text */}
            <input 
              type='color'
              value={colourData.inGame.team1Text}
              onChange={(e) => {
                const newVal = e.target.value;

                setColours((prev) => {
                  if (!prev) return null;

                  const nextState = {
                    ...prev,
                    inGame: {...prev.inGame, team2Text: newVal},
                  };

                  window.stateAPI.setColour(nextState);
                  return nextState;
                });
              }}
            />
            <Typography>Team2 text: {colourData.inGame.team2Text}</Typography>
          </Box>

        </Box>

      </Box>
    </Box>
  )
}