import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DigitalClock from './components/DigitalClock'
import DigitalClock12 from './components/DigitalClock12'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{display:"inline-grid"}}>
    <DigitalClock />
    <DigitalClock12 />
     </div>
  )
}

export default App
