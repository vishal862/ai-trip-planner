import React from "react";
import { Link } from "react-router-dom";

const HotelRecc = ({ trip }) => {
  return (
    <div>
      <h1 className="font-bold mt-5 text-xl text-center">Hotel Recommendation</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 my-5">
        {trip.tripData?.hotels.map((hotelDetails, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${hotelDetails.hotelName},${hotelDetails.hotelAddress}`}
            target="_blank"
            className="flex justify-center"
          >
            <div className="w-full sm:w-[250px] hover:scale-105 transition-transform duration-300 rounded-lg shadow-md bg-white p-3">
              <img className="w-full h-[180px] object-cover rounded-lg" src="/travel.jpg" alt="Hotel" />
              <div className="flex flex-col gap-2 my-3">
                <h2 className="font-medium text-lg">{hotelDetails.hotelName}</h2>
                <h2 className="text-sm text-gray-500">📍 {hotelDetails.hotelAddress}</h2>
                <h2 className="text-sm">💰 {hotelDetails.priceRange.split(" per")[0].trim()} per night</h2>
                <h2 className="text-sm">⭐ {hotelDetails.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HotelRecc;
