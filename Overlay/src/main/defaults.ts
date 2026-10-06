/* eslint-disable prettier/prettier */

import type { Casters } from "@common/caster.type";
import type { Colours } from "@common/colours.type";
import type { Match } from "@common/match.type";

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
  currMap: {map: '', team1ban: '', team2ban: ''},
  isFlipped: false,
  ft: 2,
  title: 'Title',
  prevMaps: []
}

export const DEFAULT_COLOUR_STATE: Colours = {
  team1: '#1e95c4',
  team1Text: '#e0e0e0',
  team2: '#c56ac5',
  team2Text: '#e0e0e0',
  caster: '#e0e0e0',
}

export const DEFAULT_CASTER_STATE: Casters = {
  number: 2,
  casters: [
    { name: 'Name', handle: 'Handle' },
  ]
}
