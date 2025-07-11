import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Components/home';
import ProductDetail from './Components/ProductDetails';
import ProductList from './Components/ProductList';
import Breadcrumbs from './Components/Breadcrumbs';

function App() {
  // const [count, setCount] = useState(0)

  return (
   <Router>
      <div className="app">
        <h1>RoadsideCoder Store</h1>
        <Breadcrumbs />
        {/* <hr /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
