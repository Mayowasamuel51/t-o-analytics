import React from 'react'
import { Link } from 'react-router-dom'

const errorPage = () => {
  return (
    <div className='min-h-full flex justify-center items-center'>
        <div className='text-center'>
            <p className='font-semibold'>NO GO AREA</p>
            <p className='underline text-blue-600'>
                <Link to="/">Back to home</Link>
            </p>
        </div>
    </div>
  )
}

export default errorPage;