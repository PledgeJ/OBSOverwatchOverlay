/* eslint-disable prettier/prettier */
import type { Casters } from '@common/caster.type';
import type { Colours } from '@common/colours.type';
import type { Match } from '@common/match.type';
import type { ServerStatus } from '@common/servers.type';

import { Box } from '@mui/material';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import React, { useEffect, useState } from 'react';

import { InitialInfo } from '../components/MenuTabs/InitialInfoTab';
import { MatchTab } from '@renderer/components/MenuTabs/MatchTab';
import { ControlTab } from '@renderer/components/MenuTabs/ControlTab';
import { ColoursTab } from '@renderer/components/MenuTabs/ColoursTab';
import { TopDisplay } from '@renderer/components/ControlPanel/TopDisplay';
import { ConnectionCollapse } from '@renderer/components/ControlPanel/ConnectionCollapse';

export default function ControlPanel(): React.JSX.Element {
  const DEFAULT_SERVER_STATUS: ServerStatus = {
    http: { 
      status: true, 
      port: 0, 
    },
    ws: {
      status: true,
      port: 0,
    },
  }

  const [open, setOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>(DEFAULT_SERVER_STATUS);

  const [tab, setTab] = useState(1);

  const [matchData, setMatch] = useState<Match | null>(null);
  const [colourData, setColours] = useState<Colours | null>(null);
  const [casterData, setCasters] = useState<Casters | null>(null);

  async function fetchState(): Promise<void> {
    try {
      const { match, colours, casters } = await window.stateAPI.getState();

      setMatch(match);
      setColours(colours);
      setCasters(casters);
    } catch (e) {
      console.error('Failed fetch: ' + e);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function initFetch(): Promise<void> {
      try {
        await fetchState();
      } catch (e) {
        if (isMounted) {
          console.error('Failed fetch: ' + e);
        }
      }
    }

    initFetch();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log('server sync')
    return window.stateAPI.syncServerStatus(setServerStatus)
  }, [])

  if (!matchData || !colourData || !casterData) {
    return <h1>Loading...</h1>
  }

  const left = matchData.isFlipped ? 
  { team: matchData.team2, ban: matchData.currMap.team2ban, colour: {team: colourData.team2, text: colourData.team2Text}, listenin: matchData.listenin.team2 } : 
  { team: matchData.team1, ban: matchData.currMap.team1ban, colour: {team: colourData.team1, text: colourData.team1Text}, listenin: matchData.listenin.team1 }; 

  const right = matchData.isFlipped ? 
  { team: matchData.team1, ban: matchData.currMap.team1ban, colour: {team: colourData.team1, text: colourData.team1Text}, listenin: matchData.listenin.team1 } :
  { team: matchData.team2, ban: matchData.currMap.team2ban, colour: {team: colourData.team2, text: colourData.team2Text}, listenin: matchData.listenin.team2 }; 

  return (
    <>

    {/* ############################ TOP TEAM DISPLAY ################################# */}
    
    <Box sx={{margin: 2, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <TopDisplay 
        left={left} 
        right={right} 
      />
    </Box>

    <Box sx={{ width: '100%', height: '100%', typography: 'body1' }}>
      
      {/* ############################ TAB MENU ################################# */} 

      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: 2.5}}>
            <TabList 
            onChange={(_event, tab) => setTab(tab)} 
            sx={{
              '& .MuiTab-root': { color: '#cbd5e1' },
              '& .Mui-selected': { color: '#ffffff' },
              '& .MuiTabs-indicator': { backgroundColor: '#3b82f6' },
            }}
            aria-label="">
              <Tab label="Initial info" value={1} />
              <Tab label="Match" value={2} />
              <Tab label="Control" value={3} />
              <Tab label="Colours" value={4} />
            </TabList>

            <ConnectionCollapse 
              open={open}
              setOpen={setOpen}
              serverStatus={serverStatus}
            />

          </Box>
        </Box>

        {/* ############################ INITIAL INFO TAB ################################# */}

        <TabPanel value={1}>
          <InitialInfo
            matchData={matchData}
            colourData={colourData}
            casterData={casterData}
            setMatch={setMatch}
            setCasters={setCasters}
            fetchState={fetchState}
          />
        </TabPanel>

        {/* ############################ MATCH TAB ################################# */}

        <TabPanel value={2}>
          <MatchTab 
            matchData={matchData}
            colourData={colourData}
            setMatch={setMatch}
            fetchState={fetchState}
          />
        </TabPanel>

        {/* ############################ CONTROL TAB ################################# */}

        <TabPanel value={3} sx={{display: 'flex'}}>
          <ControlTab
            matchData={matchData}
            setMatch={setMatch}
          />
        </TabPanel>
          
        {/* ############################ COLOURS TAB ################################# */}

        <TabPanel value={4} sx={{display: 'flex'}}>
          <ColoursTab
            colourData={colourData}
            fetchState={fetchState}
            setColours={setColours}
          />
        </TabPanel>
      </TabContext>

      
    </Box>
    </>
  )
}
