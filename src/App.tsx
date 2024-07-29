import './App.css'
import { Box } from '@mui/material'
import { createSx } from './utils'
import { colorPalette } from './ColorPalette'
import Chat from './components/Chat'

const style = createSx({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    backgroundColor: colorPalette.blue[100],
    color: colorPalette.common.black
  }
})

function App() {

  return (
    <Box sx={style.root}>
      Lseg - ChatBot
      <Chat/>
    </Box>
  )
}

export default App
