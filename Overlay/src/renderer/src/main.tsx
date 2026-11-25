/* eslint-disable prettier/prettier */
import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createTheme, ThemeProvider } from '@mui/material'

import App from './App'

const theme = createTheme({
  typography: {
    fontFamily: "'Outfit', sans-serif",
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
