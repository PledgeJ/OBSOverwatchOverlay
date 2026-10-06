/* eslint-disable prettier/prettier */
// let matchState = {
//   team1: {
//     name: 'Team1',
//     score: 0,
//     colour: '#e1e1e1',
//     picture: ''
//   },
//   team2: {
//     name: 'Team2',
//     score: 0,
//     colour: '#e1e1e1',
//     picture: ''
//   },
//   ft: 2,
//   title: 'UoN Draft League 2026 Grand Finals',
//   matches: []
// }

// matches: [
//   {
//     team1Ban: 'Kiriko',
//     team2Ban: 'Lucio',
//     winner: 'team1',
//     map: 'Lijang Tower'
//   },
// ]

export interface Team {
    name: string;
    score: number;
    picture: string;
}

export interface PrevMap {
    team1ban: string;
    team2ban: string;
    winner: number;
    map: string;
}

export interface CurrentMap {
    map: string;
    team1ban: string;
    team2ban: string;
}

export interface Match {
    team1: Team;
    team2: Team;
    currMap: CurrentMap;
    ft: number;
    title: string;
    prevMaps: PrevMap[];
    isFlipped: boolean;
    mapScreen: boolean;
}
