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
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    travelWith: "",
  });
  console.log(formData);

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    if (inputValue) {
      fetchLocations(inputValue);
    } else {
      setOptions([]);
    }
  };

  const fetchLocations = async (query) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const places = response.data.map((place) => ({
        label: place.display_name,
        value: place.display_name,
      }));
      setOptions(places);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setOptions([]);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedPlace(selectedOption);
    setFormData((prev) => ({ ...prev, destination: selectedOption.value }));
  };

  const handleDaysChange = (e) => {
    setFormData((prev) => ({ ...prev, days: e.target.value }));
  };

  const handleBudgetSelect = (budget) => {
    setFormData((prev) => ({ ...prev, budget }));
  };

  const handleTravelSelect = (travelWith) => {
    setFormData((prev) => ({ ...prev, travelWith }));
  };

  const onGenerate = () => {
    const day = Number(formData.days)
    if (day > 5) {
      console.log("Number of days should be less than 5");
      return;
    }
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
            onInputChange={handleInputChange}
            onChange={handleChange}
            inputValue={inputValue}
            placeholder="Enter location"
            noOptionsMessage={() => "No locations found"}
          />
          {selectedPlace && (
            <p className="mt-2 text-gray-600">
              Selected: {selectedPlace.label}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-medium my-3">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            value={formData.days}
            onChange={handleDaysChange}
          />
        </div>

        <div>
          <h2 className="text-xl font-medium my-3">What is Your Budget?</h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {budgetOptions.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg border p-4 cursor-pointer hover:shadow-lg ${
                  formData.budget === item.title ? "border-blue-500" : ""
                }`}
                onClick={() => handleBudgetSelect(item.title)}
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
                key={item.id}
                className={`rounded-lg border p-4 cursor-pointer hover:shadow-lg ${
                  formData.travelWith === item.people ? "border-blue-500" : ""
                }`}
                onClick={() => handleTravelSelect(item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end my-20">
          <Button onClick={onGenerate}>Generate Trip</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
