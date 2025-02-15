import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/FirebaseConfig";
import InfoSection from "../component/InfoSection";
import HotelRecc from "../component/HotelRecc";
import PlacesToVisit from "../component/PlacesToVisit";

const ViewTrip = () => {
  const { tripId } = useParams();

  const [trip, setTrip] = useState([])

  console.log(trip);
  

  useEffect(() => {
    tripId&&getTripData();
  }, [tripId])
  

  const getTripData = async () => {
    const docRef = doc(db, "AiTrip", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* information section */}
        <InfoSection trip={trip}/>
      {/* Recommended hotels */}
        <HotelRecc trip={trip}/>
      {/* daily plan */}
        <PlacesToVisit trip={trip}/>
    </div>
  );
};

export default ViewTrip;
