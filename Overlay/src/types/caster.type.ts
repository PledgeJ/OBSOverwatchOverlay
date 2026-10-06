/* eslint-disable prettier/prettier */
export interface Caster {
    name: string;
    handle: string;
}

export interface Casters {
    number: number;
    casters: Caster[]
}