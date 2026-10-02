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
    colour: string;
    picture: string;
}

export interface PrevMatch {
    team1ban: string;
    team2ban: string;
    winner: 1 | 2;
    map: string;
}

export interface Match {
    team1: Team;
    team2: Team;
    ft: number;
    title: string;
    matches: []
}
