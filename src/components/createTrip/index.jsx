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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

function CreateTrip() {
  const { toast } = useToast();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [openDialouge, setOpenDialouge] = useState(false);
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
        setOpenDialouge(false)
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
    if (day > 5) {
      toast({
        title: "Error",
        description: "Number of days should be less than 5",
        variant: "destructive",
      });
      return;
    }
    if (!formData.destination || !formData.budget || !formData.travelWith) {
      toast({
        title: "Error",
        description: "Please fill all the details",
        variant: "destructive",
      });
      return;
    }
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.destination)
      .replace("{totalDays}", formData?.days)
      .replace("{traveler}", formData?.travelWith)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.days);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result.response.text());
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

        <Dialog open={openDialouge}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <div className="flex items-center">
                  <img src="logo.svg" />
                  <h1 className="text-black">voyage</h1>
                </div>
                <h2 className="font-bold mt-5 text-lg">Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely</p>

                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In with google
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
