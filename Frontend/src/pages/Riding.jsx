import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect,useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'
import "../App.css"

const Riding = () => {
    const location = useLocation()
    const  {ride}  = location.state || {} 
    const navigate=useNavigate()
    const {socket} = useContext(SocketContext)
    
    socket.on("ride-ended", () => {
        navigate('/home')
    })
    if (!location.state || !ride) {
        return <div>Loading ride data...</div>
    }

    if (!ride.captain) {
        return <div>Waiting for captain data...</div>
    }


    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed h-10 w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full'>
                <i className=" text-lg font-medium ri-home-2-line"></i>
            </Link>
            <div className='h-1/2'>
             <LiveTracking/>
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dvpmpkBxRwzt84h3R46p43rK3mZWrhAvXw&s" alt="" />
                    <div className='text-right' >
                        <h2 className='text-lg font-medium'>     {ride?.captain.fullname.firstname} {ride?.captain.fullname.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
                        <p className='text-sm text-gray-600'> {ride?.captain?.vehicle?.vehicleType}</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-time-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>Destination</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className=" text-lg ri-currency-line"></i>
                            <div >
                                <h3 className='text-lg font-medium'>₹ {ride?.fare}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white p-2 font-semibold rounded-lg'>Make a Payemennt</button>
            </div>
        </div>
    )
}

export default Riding