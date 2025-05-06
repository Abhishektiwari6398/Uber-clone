import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/captainContext';

const CaptainDetails = () => {
  const { captain ,isLoading,error} = useContext(CaptainDataContext)
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    if (!captain || !captain.fullname) {
      return <div>No captain data available</div>;
    }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img className='h-10 w-10 rounded-full object-cover' src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" alt="" />
          <h4 className='text-lg font-medium '>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className='text-lg font-semibold'>$2.00</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>
      <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-8 items-start'>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-speed-line"></i>
          <h5 className='text-lg font-medium'>50 km</h5>
          <p className='text-sm text-gray-600'>Distance</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-book-read-fill"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;