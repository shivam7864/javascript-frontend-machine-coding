import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TrafficLight from './components/TrafficLight'

const TrafficLights = [
  {
    color: "red",
    time: 2000, // 4sec
    order: 2,
    displayOrder: 3,
  },
  {
    color: "yellow",
    time: 5000, // 4sec
    order: 3,
    displayOrder: 2,
  },
  {
    color: "green",
    time: 2000, // 4sec
    order: 1,
    displayOrder: 0,
  },
  {
    color: "aqua",
    time: 1000, // 4sec
    order: 2,
    displayOrder: 3,
  },
  {
    color: "purple",
    time: 400, // 4sec
    order: 4,
    displayOrder: 1,
  },
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TrafficLight data={TrafficLights}/>
    </>
  )
}

export default App
