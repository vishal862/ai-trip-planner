import React from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center px-4">
      {/* Heading Section */}
      <div className="flex flex-col text-center mt-12 sm:mt-16 gap-6 max-w-[90%] sm:max-w-[75%] lg:max-w-[60%]">
        <h1 className="text-[#f56551] font-extrabold text-3xl sm:text-4xl lg:text-5xl">
          Discover Your Next Adventure with AI:
        </h1>
        <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl">
          Personalized Itineraries at Your Fingertips
        </h1>
      </div>

      {/* Subtext */}
      <p className="text-gray-400 text-md sm:text-lg text-center mt-8 sm:mt-10 max-w-[90%] sm:max-w-[75%] lg:max-w-[60%]">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>

      {/* Button */}
      <Link to={"/create-trip"} className="mt-8 sm:mt-10">
        <Button className="text-sm sm:text-md px-4 py-2 sm:px-6 sm:py-3">
          Get Started, it's free
        </Button>
      </Link>
      <div className="my-10">
        <img src="/Galaxy-Fold2-localhost.png" alt="" />
      </div>
    </div>
  );
};

export default Home;
