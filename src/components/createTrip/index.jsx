import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  AI_PROMPT,
  budgetOptions,
  selectTravelsList,
} from "../../constants/option";
import { useToast } from "@/hooks/use-toast";
import { chatSession } from "@/services/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/services/FirebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const { toast } = useToast();
  const route = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [openDialouge, setOpenDialouge] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const login = useGoogleLogin({
    onSuccess: (res) => getUserDetails(res),
    onError: (error) => console.log(error),
  });

  const getUserDetails = async (tokenInfo) => {
    await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialouge(false);
        onGenerate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onGenerate = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialouge(true);
      return;
    }

    const day = Number(formData.days);
    if (day > 10) {
      toast({
        title: "Error",
        description: "Number of days should be less than 10",
        variant: "destructive",
      });
      return;
    }
    if (!formData.destination || !formData.days || !formData.budget || !formData.travelWith) {
      toast({
        title: "Error",
        description: "Please fill all the details",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.destination)
      .replace("{totalDays}", formData?.days)
      .replace("{traveler}", formData?.travelWith)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.days);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response.text());
    setLoading(false);
    saveTripData(result?.response.text());
  };

  const saveTripData = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrip", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });

    setLoading(false);
    route("/view-trip/" + docId);
  };

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-48 2xl:px-56 mt-10">
      <h1 className="font-bold text-2xl sm:text-3xl text-center sm:text-left">
        Tell us your travel preferences 🏕️🌴
      </h1>
      <p className="mt-3 text-gray-500 text-lg sm:text-xl text-center sm:text-left">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-10 space-y-10">
        <div>
          <h2 className="text-lg sm:text-xl font-medium my-3 text-center sm:text-left">
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
            <p className="mt-2 text-gray-600 text-center sm:text-left">
              Selected: {selectedPlace.label}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-medium my-3 text-center sm:text-left">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            value={formData.days}
            onChange={handleDaysChange}
            className="w-full"
          />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-medium my-3 text-center sm:text-left">
            What is Your Budget?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5">
            {budgetOptions.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg border p-4 cursor-pointer hover:shadow-lg transition-all duration-200 text-center sm:text-left ${
                  formData.budget === item.title ? "border-blue-500" : ""
                }`}
                onClick={() => handleBudgetSelect(item.title)}
              >
                <h2 className="text-3xl sm:text-4xl">{item.icon}</h2>
                <h2 className="text-md sm:text-lg font-bold">{item.title}</h2>
                <h2 className="text-xs sm:text-sm text-gray-500">
                  {item.description}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-medium my-3 text-center sm:text-left">
            Who do you plan on traveling with?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5">
            {selectTravelsList.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg border p-4 cursor-pointer hover:shadow-lg transition-all duration-200 text-center sm:text-left ${
                  formData.travelWith === item.people ? "border-blue-500" : ""
                }`}
                onClick={() => handleTravelSelect(item.people)}
              >
                <h2 className="text-3xl sm:text-4xl">{item.icon}</h2>
                <h2 className="text-md sm:text-lg font-bold">{item.title}</h2>
                <h2 className="text-xs sm:text-sm text-gray-500">
                  {item.desc}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center py-4 sm:justify-end my-14">
          <Button
            disabled={loading}
            onClick={onGenerate}
            className="px-6 py-4 text-lg sm:text-xl"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin h-6 w-6" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={openDialouge}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <div className="flex items-center justify-center sm:justify-start">
                  <img src="logo.svg" alt="Voyage Logo" className="h-8 w-8" />
                  <h1 className="text-black ml-2 text-xl font-semibold">
                    Voyage
                  </h1>
                </div>
                <h2 className="font-bold mt-5 text-lg text-center sm:text-left">
                  Sign In With Google
                </h2>
                <p className="text-center sm:text-left">
                  Sign in to the App with Google authentication securely
                </p>

                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center justify-center py-3"
                >
                  <FcGoogle className="h-6 w-6" />
                  Sign In with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
