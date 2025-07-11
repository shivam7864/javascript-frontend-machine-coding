import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Stepper from './Components/Stepper'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Stepper />
    </>
  )
}

export default App
