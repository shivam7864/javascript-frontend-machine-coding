import React, { useEffect, useState } from 'react'

const ProgressBarByWidthPercent = ({progress}) => {
  const [status, setStatus] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setStatus(progress);
    }, 250);
  }, [progress]);
  return (
    <div className='outer'>
      <div className='inner' style={{width:`${status}%`}}>
        {status}%
      </div>
    </div>
  )
}

export default ProgressBarByWidthPercent
