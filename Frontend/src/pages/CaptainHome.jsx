import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import RidePop from '../components/RidePop'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/captainContext'
import axios from 'axios'


const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain, isLoading } = useContext(CaptainDataContext)

  useEffect(() => {
    if (captain && !isLoading) {
      socket.emit('join', {
        userType: 'captain',
        userId: captain._id
      });
    };

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          if (captain) {
            socket.emit('update-location-captain', {
              userId: captain._id,
              location: {
                lat: position.coords.latitude,
                lon: position.coords.longitude
              }
            })
          }
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
    return () => clearInterval(locationInterval);
  }, [captain, isLoading, socket]);

  socket.on('new-ride', (data) => {
    console.log('New ride request received:', data);
    setRide(data);
    setRidePopupPanel(true);

  });
  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}ride/confirm`, {
      rideId: ride._id,
      captain: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  };


  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
        <Link to='/home' className=' h-10 w-10  bg-white flex items-center justify-center rounded-full'>
          <i className=" text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        <img src="" alt="" />
      </div >
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12'>
        <RidePop
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full h-screen z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12'>
        <ConfirmRidePopup 
          ride={ride}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome