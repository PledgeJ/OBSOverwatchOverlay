/* eslint-disable prettier/prettier */
import { HashRouter, Routes, Route } from 'react-router-dom'

import ControlPanel from './pages/ControlPanel'
import GameOverlay from './pages/GameOverlay'
import IntermissionOverlay from './pages/IntermissionOverlay'


function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<ControlPanel/>} />
          <Route path='/overlay/ingame' element={<GameOverlay/>} />
          <Route path='/overlay/intermission' element={<IntermissionOverlay/>} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
