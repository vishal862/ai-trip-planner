import React from 'react';

const InfoSection = ({ trip }) => {
  return (
    <div className="w-full">
      {/* Image Section */}
      <img
        className="h-[250px] sm:h-[300px] w-full rounded-xl object-cover"
        src="/travel.jpg"
        alt="Destination"
      />

      {/* Info Section */}
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl mt-8 font-bold">{trip.userSelection?.destination}</h1>

        {/* Details Section */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-5">
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-sm sm:text-md">
            📅 {trip.userSelection?.days} Days
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-sm sm:text-md">
            💰 {trip.userSelection?.budget}
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-sm sm:text-md">
            🥂 Travelers: {trip.userSelection?.travelWith}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
