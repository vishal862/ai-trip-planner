import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { budgetOptions, selectTravelsList } from "../../constants/option";

function CreateTrip() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState([]);
  console.log(formData);
  

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue); // Update the input value state
    if (inputValue) {
      fetchLocations(inputValue); // Fetch locations when input changes
    } else {
      setOptions([]); // Clear options if input is empty
    }
  };

  const fetchLocations = async (query) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const places = response.data.map((place) => ({
        label: place.display_name, // Ensure this is a string
      }));
      setOptions(places);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setOptions([]); // Reset options on error
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedPlace(selectedOption);
    console.log("Selected Place:", selectedOption);
    setFormData({...formData,selectedOption})
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h1 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h1>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-14">
        <div>
          <h2 className="text-xl font-medium my-3">
            What is your destination of choice?
          </h2>
          <Select
            options={options}
            onInputChange={handleInputChange} // Handle input changes
            onChange={handleChange} // Handle selection changes
            inputValue={inputValue} // Controlled input value
            placeholder="Enter location"
            noOptionsMessage={() => "No locations found"} // Custom message when no options are available
          />
          {selectedPlace && (
            <p className="mt-2 text-gray-600">
              Selected: {selectedPlace.label || "Location not found"}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-medium my-3">
            How many days are you planning your trip?
          </h2>
          <Input placeholder={"Ex. 3"} onChange={(e)=>{formData(e.target.value)}} type="number" />
        </div>

        <div>
          <h2 className="text-xl font-medium my-3">What is Your Budget?</h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {budgetOptions.map((item) => (
              <div
                className="rounded-lg border p-4 cursor-pointer hover:shadow-lg"
                key={item.id}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium my-3">
            Who do you plan on traveling with?
          </h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {selectTravelsList.map((item) => (
              <div
                className="rounded-lg border p-4 cursor-pointer hover:shadow-lg"
                key={item.id}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                {/* <h2 className="text-sm text-gray-500">{item.people}</h2> */}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end my-20">
          <Button>Generate Trip</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
