import React from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col text-center mt-16 gap-6">
        <h1 className="text-[#f56551] font-extrabold text-5xl">
          Discover Your Next Adventure with AI:
        </h1>
        <h1 className="font-extrabold text-5xl">
          Personalized Itineraries at Your Fingertips
        </h1>
      </div>
      <p className="text-gray-400 text-lg text-center mt-10">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'} className="mt-10">
        <Button>Get Started, it's free</Button>
      </Link>
    </div>
  );
};

export default Home;
