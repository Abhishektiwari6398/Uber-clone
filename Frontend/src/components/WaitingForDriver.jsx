import React from 'react'

const WaitingForDriver = (props) => {
    if (!props.ride) {
        return <div>Loading ride details...</div>;
    }
    if (!props.ride.captain || !props.ride.captain.fullname) {
        return <div>Waiting for driver details...</div>;
    }
    const { captain } = props.ride;

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setWaitingForDriver(false)
            }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>

            <div className='flex items-center justify-between'>
                <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dvpmpkBxRwzt84h3R46p43rK3mZWrhAvXw&s" alt="" />
                <div className='text-right' >
                    <h2 className='text-lg font-medium'>{captain.fullname.firstname} {captain.fullname.lastname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>  {captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600 capitalize'>   {captain.vehicle.vehicleType}</p>
                    <h1 className='text-lg font-semibold'>OTP - {props.ride?.otp} </h1>
                </div>
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
                            <p className='text-sm -mt-1 text-gray-600'>cash cash</p>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white p-2 font-semibold rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default WaitingForDriver