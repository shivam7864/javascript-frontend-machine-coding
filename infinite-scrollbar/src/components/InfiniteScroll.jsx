import React, { useState } from 'react'

const InfiniteScroll = () => {
    const [data,setData] = useState([...new Array(40)]);
    const [loading,setLoading] = useState(false);
    const THRESHOLD = 20;

    const loadMore = () =>{
        setLoading(true);
        setTimeout(()=>{
            setData((prev) => [...prev, ...new Array(10)]);
            setLoading(false);
        },3000)
    }

    const handleScroll = (event) =>{
        const scrollTop = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;
        const remainingHeight = scrollHeight-(scrollTop+clientHeight);
        
        
        if(remainingHeight < THRESHOLD && !loading){
            loadMore();
        }
    }
    
  return (
    <div onScroll={(e)=>handleScroll(e)} className='infinite'>
      {
        data?.map((item,index) =>{
            return (
                <div className='row'>{index+1}</div>
            )
        })
      }
    </div>
  )
}

export default InfiniteScroll
