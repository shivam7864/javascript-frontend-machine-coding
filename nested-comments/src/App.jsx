import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NestedComments from './component/NestedComments'
import commentsData from "./data/comments.json";

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
   <h1>Nested Comment System</h1>
      <NestedComments
        comments={commentsData}
        onSubmit={(content) => {}}
        onEdit={(content) => {}}
        onDelete={() => {}}
        // onUpvote={() => {}}
        // onDownvote={() => {}}
      />
   </div>
  )
}

export default App
