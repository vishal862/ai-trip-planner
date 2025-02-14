import React from "react";
import { Link } from "react-router-dom";

const HotelRecc = ({ trip }) => {
  return (
    <div>
      <h1 className="font-bold mt-5 text-xl">Hotel Recommendation</h1>
      <div className="grid grid-cols-2 my-5 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip.tripData?.hotels.map((hotelDetails, index) => (
          <Link key={index} to={`https://www.google.com/maps/search/?api=1&query=${hotelDetails.hotelName}","${hotelDetails.hotelAddress}`} target="_blank">
            <div
              key={index}
              className="mt-5 hover:scale-110 transition-transform duration-300 rounded-lg"
            >
              <img
                className="h-[200px] w-[200px] rounded-lg"
                src="/travel.jpg"
                alt=""
              />
              <div className="flex flex-col gap-2 my-2">
                <h2 className="font-medium">{hotelDetails.hotelName}</h2>
                <h2 className="text-xs text-gray-500">
                  📍{hotelDetails.hotelAddress}
                </h2>
                <h2 className="text-sm">
                  💰 {hotelDetails.priceRange.split(" per")[0].trim()} per night
                </h2>
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
