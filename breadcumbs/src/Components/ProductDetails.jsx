import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const [product,setProduct] = useState();
  const {id} = useParams();
  const fetchDetails = async()=>{
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    }
    useEffect(()=>{
      fetchDetails();
    },[])
  
  return (
    <div>
      <h2>Product Detail Page</h2>
      {product ? (
        <div>
          <img src={product.thumbnail} alt="Product" />
          <h3>{product.title}</h3>
          <h3>$ {product.price}</h3>
          <p>{product.description}</p>
        </div>
      ) : (
        // this is not the right way to do loading, create a separate state for this
        // This is temporary solution for breadcrumbs tutorial
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProductDetail
