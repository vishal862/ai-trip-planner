import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="flex justify-between px-3 shadow-sm items-center">
      <div className="flex">
        <img src="logo.svg" alt="" />
        <h1>voyage</h1>
      </div>
      <Button>Sign Up</Button>
    </div>
  );
};

export default Header;
