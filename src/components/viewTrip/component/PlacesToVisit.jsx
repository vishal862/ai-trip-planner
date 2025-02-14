import React from "react";
import { Link } from "react-router-dom";

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl mb-5">Places to Visit</h1>
      <div className="space-y-8">
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className="border p-5 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {item.day}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item.activities.map((eachDay, index) => (
                <Link key={index} to={`https://www.google.com/maps/search/?api=1&query=${eachDay.placeName}`} target="_blank">
                  <div
                    key={index}
                    className="border rounded-xl p-4 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                  >
                    {/* <h1 className="text-lg my-3 text-orange-500 font-bold">{eachDay.duration}</h1> */}
                    <img
                      className="h-[150px] w-full object-cover rounded-lg mb-3"
                      src="/travel.jpg"
                      alt=""
                    />
                    <div>
                      <h1 className="text-lg font-semibold text-black">
                        {eachDay.placeName}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {eachDay.placeDetails}
                      </p>
                      <h2 className="text-gray-600">
                        🕛 {eachDay.travelTimeFromHotel}
                      </h2>
                      <h2 className="text-gray-600">
                        🎟️ {eachDay.ticketPricing}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
