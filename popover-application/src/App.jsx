import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainComp from './components/MainComp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainComp />
    </>
  )
}

export default App
