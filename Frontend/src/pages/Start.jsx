import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className=' bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1691787564383-fbf69e1f945c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen  pt-8  flex justify-between flex-col w-full '>
        <img className='w-14 ml-8 ' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
       <div className='bg-white py-7 px-4'>
       <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
       <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 '>Continue</Link>
       </div>
    </div>
  )
}

export default Start