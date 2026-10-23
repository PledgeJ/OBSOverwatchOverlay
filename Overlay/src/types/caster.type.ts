/* eslint-disable prettier/prettier */
export interface Caster {
    name: string;
    handle: string;
    camURL: string;
}

export interface Casters {
    number: number;
    casters: Caster[]
}