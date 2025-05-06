import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const ConfirmRidePopup = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}ride/start-ride`, {
                params: { rideId: props.ride._id, otp:otp },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)
                navigate('/captain-riding', { 
                    state: { ride: response.data }
                })
            }
        } catch (err) {
       console.error('Error starting ride:', err.response?.data?.message || err.message)
    }
}

return (
    <div className=''>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
            props.setConfirmRidePopupPanel(false)
        }}>
            <i className=" text-3xl text-gray-500 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
        <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3 '>
                <img className='h-10 w-10 rounded-full object-cover' src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?semt=ais_hybrid" alt="" />
                <h2 className='text-lg font-medium'> {props.ride?.userId.fullname.firstname} {props.ride?.userId.fullname.lastname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2km</h5>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>

            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className=" text-lg ri-user-location-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-time-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className=" text-lg ri-currency-line"></i>
                    <div >
                        <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
            </div>
            <div className='mt-6 w-full'>
                <form onSubmit={submitHandler}>
                    <input value={otp} onChange={(e) => setOtp(e.target.value)} className='bg-[#eee] px-6 py-4 text-xl font-mono rounded w-full mt-5' type="text" placeholder='Enter-otp' />
                    <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                    <button
                        onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)
                        }}
                        className='w-full mt-3 bg-red-500 text-white text-lg p-3 font-semibold rounded-lg'>Cancel</button>
                </form>
            </div>
        </div>
    </div>
)
}

export default ConfirmRidePopup