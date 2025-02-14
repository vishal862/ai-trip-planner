import React from 'react'

const InfoSection = ({trip}) => {
  return (
    <div>
        <img className='h-[300px] w-full rounded-xl object-cover' src="/travel.jpg" alt="" />
        <div>
            <h1 className='text-lg mt-10 font-bold'>{trip.userSelection?.destination}</h1>
            <div className='flex items-center gap-10 mt-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>📅 {trip.userSelection?.days} Days</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>💰 {trip.userSelection?.budget}</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>🥂 No. of travelers: {trip.userSelection?.travelWith}</h2>
            </div>
        </div>
    </div>
  )
}

export default InfoSection