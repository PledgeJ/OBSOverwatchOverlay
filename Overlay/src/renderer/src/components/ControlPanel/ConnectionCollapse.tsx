/* eslint-disable prettier/prettier */
import { Box, Button, Collapse, Link, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

import { ServerStatus } from "@common/servers.type";

interface CollapseProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  serverStatus: ServerStatus
}

export function ConnectionCollapse({
  open,
  setOpen,
  serverStatus,
}: CollapseProps): React.JSX.Element {

  let connNum: number = 0
  if (serverStatus.http.status) { connNum++; }
  if (serverStatus.ws.status) { connNum++; }

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
            color: connNum ? '#57de3e' : '#ff073a',
            }}>
            {serverStatus.http.status ?
              <><FaCheckCircle /><Typography>HTTP server</Typography></> :
              <><FaExclamationTriangle /><Typography>{serverStatus.http.error}</Typography></>
            }
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,
            color: connNum ? '#57de3e' : '#ff073a',
            }}>
            {serverStatus.ws.status ?
              <><FaCheckCircle /><Typography>WS server</Typography></> :
              <><FaExclamationTriangle /><Typography>{serverStatus.ws.error}</Typography></>
            }
          </Box>

          <br/>

          <Typography>http://localhost:{serverStatus.http.port}/ingame</Typography>
          <Typography>http://localhost:{serverStatus.http.port}/intermission</Typography>
          <br/>                  
          <Typography>• Add each link as a browser source in obs</Typography>
          <Typography>• Set height and width to 1920 x 1080</Typography>
          <br/>
          <Typography sx={{ fontWeight: 600 }}>Caster Cameras</Typography>
          <Typography>• Go to{' '}<Link sx={{ ml: 0.5 }} href={'https://vdo.ninja/'} target="_blank" rel="noopener noreferrer">VDO.ninja</Link></Typography>
          <Typography>• Create a room and get casters to join</Typography>
          <Typography>• Press &apos;copy solo view link&apos;</Typography>
          <Typography>• Paste each into the input for each caster</Typography>

        </Collapse>
      </Box>
    </>
  )
}