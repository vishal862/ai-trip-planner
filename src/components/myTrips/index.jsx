import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

import { db } from "../../services/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const MyTrips = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  if (!user) {
    navigate("/");
    return;
  }

  const [trips, setTrips] = useState([]);
  console.log(trips);
  
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserTrips().then((data) => {
      setTrips(data || []);
      setLoading(false);
    });
  }, [user.id]);

  const fetchUserTrips = async () => {
    const userEmail = user?.email;
    if (!userEmail) return;

    const q = query(
      collection(db, "AiTrip"),
      where("userEmail", "==", userEmail)
    );
    try {
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return trips;
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <>
      <h2 className="font-bold text-3xl text-center mt-5">My Trips</h2>

      {Loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-[250px] w-[250px] rounded-xl"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {trips.map((eachTrip, index) => (
              <Link key={index} to={`/view-trip/${eachTrip.id}`}>
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 h-[250px] flex flex-col justify-between"
                >
                  <img
                    className="h-[150px] w-full object-cover rounded-lg"
                    src="/travel.jpg"
                    alt=""
                  />
                  <h1 className="text-lg text-black font-bold mt-3 text-center truncate w-full">
                    {eachTrip?.userSelection?.destination}
                  </h1>
                  <p className="text-sm text-gray-500 text-center w-full">
                    {eachTrip?.userSelection?.days} days trip with
                    <span className="font-bold">
                      {" "}
                      {eachTrip?.userSelection?.budget}
                    </span>{" "}
                    Budget
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyTrips;
