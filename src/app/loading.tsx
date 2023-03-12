import React from 'react'

const loading = () => {
  return (
    <div className='w-screen min-h-screen'>
        <div className='flex flex-col items-center justify-center h-screen'>
            <span className='font-bold text-5xl'>
                Loading...
            </span>
        </div>
    </div>
  )
}

export default loading