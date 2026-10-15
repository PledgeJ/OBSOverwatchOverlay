/* eslint-disable prettier/prettier */
import { Box, Button, Collapse, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { UserInput } from "./UserInput";
import { Match } from "@common/match.type";
import { obsConn } from "@renderer/services/OBSConnection";
import { ServerStatus } from "@common/servers.type";

interface CollapseProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  connNum: number
  active: boolean
  obsWS: boolean
  matchData: Match;
  setMatch: React.Dispatch<React.SetStateAction<Match | null>>;
  serverStatus: ServerStatus
}

export function ConnectionCollapse({
  open,
  setOpen,
  connNum,
  active,
  obsWS,
  matchData,
  setMatch,
  serverStatus,
}: CollapseProps): React.JSX.Element {
  return (
    <>
      <Box>
        <Button
          onClick={() => setOpen((prev) => !prev)}
          startIcon={
            <ExpandMoreIcon
              sx={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                color: connNum == 2 ? '#57de3e' : '#ff073a',
                filter: connNum == 2 ? 'drop-shadow(0 0 2px rgba(57, 255, 20, 0.8))' : 'drop-shadow(0 0 2px rgba(255, 7, 58, 0.8))',
              }}
            />
          }
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            color: connNum == 2 ? '#57de3e' : '#ff073a',
            filter: connNum == 2 ? 'drop-shadow(0 0 2px rgba(57, 255, 20, 0.8))' : 'drop-shadow(0 0 2px rgba(255, 7, 58, 0.8))',
            fontSize: 14          
          }}>
            <Typography sx={{fontSize: 14}}>Connection: {connNum}/2</Typography>
            {connNum == 2 ? <FaCheckCircle /> : <FaExclamationTriangle />}
          </Box>
        </Button>

        <Collapse in={open} timeout="auto" unmountOnExit
          sx={{ position: 'absolute', 
            right: 0, 
            zIndex: 999, 
            mr: 1, mt: 1, p: 2, 
            backgroundColor: '#2c3542', 
            boxShadow: 5, 
            borderRadius: 1 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,
            color: active ? '#57de3e' : '#ff073a',
            }}>
            {active ? <FaCheckCircle /> : <FaExclamationTriangle />}
            <Typography>Overlay HTTP server</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,
            color: obsWS ? '#57de3e' : '#ff073a',
            }}>
            {obsWS ? <FaCheckCircle /> : <FaExclamationTriangle />}
            <Typography>OBS Websocket connection</Typography>
          </Box>

          <br/>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <UserInput
              label='OBS Password'
              disabled={obsWS}
              value={matchData.obsPass}
              onChange={(value) => {
                setMatch((prev) => {
                  if (!prev) return null;

                  const nextState = {
                    ...prev,
                    obsPass: value
                  };

                  window.stateAPI.setMatch(nextState);
                  return nextState;
                });
              }}
            />

            <Button
              sx={{ display: obsWS ? 'none' : 'block'}}
              onClick={ () => {
                if (!matchData || obsWS) { return; }
                obsConn.connect(matchData.obsPass)
              }}
            >
              Connect
            </Button>

            <Button
              sx={{ display: obsWS ? 'block' : 'none'}}
              onClick={ () => {
                if (obsWS) { obsConn.disconnect() }
              }}
            >
              Disconnect
            </Button>

          </Box>

          <br />
          <Typography>(In OBS)</Typography>
          <Typography>• Tools &gt; WebSocket Server Settings</Typography>
          <Typography>• Tick Enable WebSocket server if it isn’t already</Typography>
          <Typography>• Make sure Server Port is 4455 (the default)</Typography>
          <Typography>• Tick Enable Authentication</Typography>
          <Typography>• Set a Server Password, or click Generate Password</Typography>
          <Typography>• Click Show Connect Info</Typography>
          <br/>

          <Box>
            {active ? 
            <>
              <Typography>http://localhost:{serverStatus.http.port}/ingame</Typography>
              <Typography>http://localhost:{serverStatus.http.port}/intermission</Typography>
              <br/>                  
              <Typography>• Add each link as a browser source in obs</Typography>
              <Typography>• Set height and width to 1920 x 1080</Typography>
            </>
            : 
            <>
              <Typography>Error with overlay:</Typography>
              {serverStatus.http.error && <Typography>{serverStatus.http.error}</Typography>}
              {serverStatus.http.error && <Typography>{serverStatus.ws.error}</Typography>}
            </>}
          </Box>
        </Collapse>
      </Box>
    </>
  )
}