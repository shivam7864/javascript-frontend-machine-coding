import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmployeeManage from './assets/components/EmployeeManage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <EmployeeManage />
    </>
  )
}

export default App
