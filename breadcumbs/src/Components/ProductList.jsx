import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products,setProducts] = useState([]);
  const fetchDetails = async()=>{
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    
    setProducts(data.products);
  }
  useEffect(()=>{
    fetchDetails();
  },[])
  console.log(products);
  
  return (
    <div>
      <h2>Product List</h2>
      <span>Trending Products 🔥</span>
      <div className="product-grid">
        {products?.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
            </Link>
          </div>
        ))}
      </div>

      {/* <Link to="/products">
        <button style={{width: "100%", padding: 10}}>View All Products</button>
      </Link> */}
    </div>
  )
}

export default ProductList
