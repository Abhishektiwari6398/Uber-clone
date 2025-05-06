import React from 'react'

const RidePop = (props) => {
    if (!props.ride) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}>
                <i className=" text-3xl text-gray-500 ri-arrow-down-wide-fill"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride.userId.fullname.firstname + " " + props.ride.userId.fullname.lastname}</h2>
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
                <div className='flex mt-5 w-full items-center justify-between'>
                    <button
                        onClick={() => {
                            props.setRidePopupPanel(false)
                          

                        }}
                        className='  bg-gray-600 text-white text-lg p-2 px-8 font-semibold rounded-lg'>Ignore</button>
                    <button
                        onClick={() => {
                            props.setConfirmRidePopupPanel(true)
                            props.confirmRide()
                        }}
                        className='  bg-green-600 text-white text-lg p-2 px-8 font-semibold rounded-lg'>Accept</button>

                </div>
            </div>
        </div>
    )
}

export default RidePop