import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const ride = location.state?.ride

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])
  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
        <Link to='/home' className=' h-10 w-10  bg-white flex items-center justify-center rounded-full'>
          <i className=" text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-4/5'>
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
        <div className='h-screen  w-screen top-0 z-[-1]'>
                <LiveTracking />
            </div>
      </div >
      <div className='h-1/5 p-6 bg-yellow-400 flex justify-between relative items-center pt-10'
        onClick={() => {
          setFinishRidePanel(true)
        }}
      >
        <h5 className='p-1 text-center w-[88%]  absolute top-0' onClick={() => {
        }}>
          <i className=" text-3xl text-black-200 ri-arrow-up-wide-fill"></i></h5>
        <h4 className='text-xl font-semibold '>4km away</h4>
        <button className='  bg-green-600 text-white text-lg p-2 px-8 font-semibold rounded-lg'>Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12'>
        <FinishRide
          ride={ride}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
      
    </div>
  )
}

export default CaptainRiding