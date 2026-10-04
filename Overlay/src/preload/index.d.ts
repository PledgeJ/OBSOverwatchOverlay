/* eslint-disable prettier/prettier */
import { Match } from '@common/match.type';
import type { Colours } from '@common/colours.type';
import type { Casters } from '@common/caster.type';

/* eslint-disable prettier/prettier */
export interface IStateAPI {
  getState: () => Promise<{match: Match, colours: Colours, casters: Casters}>;

  setMatch: (newMatch: Match) => Promise<{success: boolean}>;
  setColour: (newColour: Colours) => Promise<{success: boolean}>;
  setCaster: (newCaster: Casters) => Promise<{success: boolean}>;

  resetMatch: () => Promise<{success: boolean}>;
}

declare global {
  interface Window {
    stateAPI: IStateAPI;
  }
}
