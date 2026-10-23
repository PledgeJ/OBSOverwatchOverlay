/* eslint-disable prettier/prettier */
export const MAPS = [
  'Aatlis',
  'Antarctic Peninsula',
  'Blizzard World',
  'Busan',
  'Circuit Royal',
  'Colosseo',
  'Dorado',
  'Eichenwalde',
  'Esperanca',
  'Havana',
  'Hollywood',
  'Ilios',
  'Junkertown',
  "King's Row",
  'Lijiang Tower',
  'Midtown',
  'Neon Junction',
  'Nepal',
  'New Junk City',
  'New Queens Street',
  'Numbani',
  'Oasis',
  'Paraiso',
  'Rialto',
  'Route 66',
  'Runasapi',
  'Samoa',
  'Shambali Monastery',
  'Suravasa',
  'Watchpoint Gibraltar',
  'Watchpoint Grimsvötn'
] as const;

export function shortenMap(map: string): string {
  switch (map) {
    case ('Watchpoint Grimsvötn'):
      return 'Grimsvötn'
    case ('Watchpoint Gibraltar'):
      return 'Gibraltar'
    case ('Shambali Monastery'):
      return 'Shambali'
    case ('New Queens Street'):
      return ('New Q Str')
    case ('New Junk City'):
      return 'NJC'
    case ('Neon Junction'):
      return 'Neon Jnct'
    case ('Lijiang Tower'):
      return 'Lijang Twr'
    case ('Blizzard World'):
      return 'Blzzd World'
    case ('Antarctic Peninsula'):
      return 'Antarctic'

    default:
      return map
  }
}
