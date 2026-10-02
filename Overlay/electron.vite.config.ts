/* eslint-disable prettier/prettier */
import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [],
    resolve: {
      alias: {
        '@shared': resolve('src/types')
      }
    }
  },
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/types')
      }
    },
    plugins: [react()]
  }
})
