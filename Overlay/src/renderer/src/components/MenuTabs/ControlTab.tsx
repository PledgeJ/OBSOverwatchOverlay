/* eslint-disable prettier/prettier */
import { Box, ToggleButton } from "@mui/material";
import React from "react";
import { Match } from "@common/match.type";

interface ControlProps {
  matchData: Match;
  setMatch: React.Dispatch<React.SetStateAction<Match | null>>;
}


export function ControlTab({
  matchData,
  setMatch,
}: ControlProps): React.JSX.Element {
  return (
    <>
      <Box>
        <ToggleButton
          value="check"
          selected={matchData.mapScreen}
          onChange={() => {
            setMatch((prev) => {
            if (!prev) return prev;

            const nextState = {
              ...prev,
              mapScreen: !prev.mapScreen,
            };

            window.stateAPI.setMatch(nextState);
            return nextState;
          });
          }}
        >
          Show maps and bans
        </ToggleButton>
      </Box>

      <ToggleButton
        value="check"
        selected={matchData.listenin.team1}
        onChange={() => {
          setMatch((prev) => {
          if (!prev) return prev;

          const nextState = {
            ...prev,
            listenin: { team1: !prev.listenin.team1, team2: false },
          };

          window.stateAPI.setMatch(nextState);
          return nextState;
        });
        }}
      >
        {matchData.team1.name} listen in
      </ToggleButton>

      <ToggleButton
        value="check"
        selected={matchData.listenin.team2}
        onChange={() => {
          setMatch((prev) => {
          if (!prev) return prev;

          const nextState = {
            ...prev,
            listenin: { team1: false, team2: !prev.listenin.team2 },
          };

          window.stateAPI.setMatch(nextState);
          return nextState;
        });
        }}
      >
        {matchData.team2.name} listen in
      </ToggleButton>
    </>
  )
}
