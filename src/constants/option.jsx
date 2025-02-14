export const selectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A couple",
    desc: "Two travelers in tandem",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving peoples",
    icon: "🏠",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Bunch of thrill seekers",
    icon: "⛵",
    people: "5 to 10 people",
  },
];

export const budgetOptions = [
  {
    id: 1,
    title: "Cheap",
    description: "Hostels, street food, public transport.",
    icon: "💰",
  },
  {
    id: 2,
    title: "Moderate",
    description: "Mid-range hotels, dining, guided tours.",
    icon: "🏨",
  },
  {
    id: 3,
    title: "Luxury",
    description: "5-star hotels, fine dining, private tours.",
    icon: "✨",
  },
];

export const AI_PROMPT ="Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest, itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan,create an array of days not an object(a request to add day as separate key ex. day : Day 1 and also make sure to have keys names strictly should be same for all the days and all the places) with best time to visit in JSON format."