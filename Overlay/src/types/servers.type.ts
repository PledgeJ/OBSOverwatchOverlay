/* eslint-disable prettier/prettier */

export interface ServerStatus {
  http: { 
    status: boolean, // true = active, false = error
    port: number, 
    error?: string 
  },
  ws: { 
    status: boolean;
    port: number,
    error?: string, 
  },
}