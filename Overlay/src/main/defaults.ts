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
  ft: 2,
  title: 'Title',
  matches: []
}

export const DEFAULT_COLOUR_STATE: Colours = {
  team1: '#e0e0e0',
  team2: '#gegege',
  caster: '#e0e0e0',
}

export const DEFAULT_CASTER_STATE: Casters = {
  number: 2,
  casters: [
    { name: 'Person1', handle: 'Handle1' },
    { name: 'Person2', handle: 'Handle2' }
  ]
}
