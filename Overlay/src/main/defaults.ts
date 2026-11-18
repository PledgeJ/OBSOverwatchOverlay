/* eslint-disable prettier/prettier */

import type { Casters } from "@common/caster.type";
import type { Colours } from "@common/colours.type";
import type { Match } from "@common/match.type";
import { ServerStatus } from "@common/servers.type";

export const DEFAULT_MATCH_STATE: Match = {
  team1: {
    name: 'Team1',
    score: 0,
    picture: ''
  },
  team2: {
    name: 'Team2',
    score: 0,
    picture: ''
  },
  currMap: {map: '', team1ban: '', team2ban: '', firstban: -1},
  isFlipped: false,
  mapScreen: false,
  ft: 2,
  title: 'Title',
  prevMaps: [],
  listenin: { team1: false, team2: false },
  obsPass: '',
}

export const DEFAULT_COLOUR_STATE: Colours = {
  team1: '#1e95c4',
  team1Text: '#e0e0e0',
  team2: '#c56ac5',
  team2Text: '#e0e0e0',
  main: '#065434',
  accent: '#deb408',
  secondary: '#198a59',
  matchStats: '#0b3624',
}

export const DEFAULT_CASTER_STATE: Casters = {
  number: 1,
  casters: [
    { name: '', handle: '', camURL: '' },
  ]
}

export const DEFAULT_SERVER_STATUS: ServerStatus = {
  http: { 
    status: true, 
    port: 0, 
  },
  ws: { 
    status: true,
    port: 0,
  },
}
