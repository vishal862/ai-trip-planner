import React from "react";
import { Link } from "react-router-dom";

const PlacesToVisit = ({ trip }) => {
  const itinerary = Array.isArray(trip?.tripData?.itinerary) ? trip.tripData.itinerary : [];

  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl mb-5">Places to Visit</h1>
      <div className="space-y-8">
        {itinerary.map((item, index) => {
          const activities = Array.isArray(item.activities) ? item.activities : [];

          return (
            <div key={index} className="border p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{item.day}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((eachDay, i) => (
                  <Link 
                    key={i} 
                    to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eachDay.placeName)}`} 
                    target="_blank"
                  >
                    <div className="border rounded-xl p-4 hover:scale-105 hover:shadow-md cursor-pointer transition-all">
                      <img className="h-[150px] w-full object-cover rounded-lg mb-3" src="/travel.jpg" alt="" />
                      <div>
                        <h1 className="text-lg font-semibold text-black">
                          {eachDay.placeName?.length > 20 ? eachDay.placeName.slice(0, 20) + "..." : eachDay.placeName}
                        </h1>
                        <p className="text-sm text-gray-500">
                          {eachDay.placeDetails?.length > 50 ? eachDay.placeDetails.slice(0, 50) + "..." : eachDay.placeDetails}
                        </p>
                        <h2 className="text-gray-600">🕛 {eachDay.travelTimeFromHotel || "N/A"}</h2>
                        <h2 className="text-gray-600">🎟️ {eachDay.ticketPricing || "Free"}</h2>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesToVisit;
