import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  
  const [openDialouge, setOpenDialouge] = useState(false);

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
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialouge(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-between items-center px-5 py-3 shadow-sm md:px-10 lg:px-20">
      <Link className="flex items-center space-x-2" to={'/'}>
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <h1 className="text-black font-bold text-lg">Voyage</h1>
      </Link>
      
      {user ? (
        <div className="flex items-center space-x-3 md:space-x-5">
          <Link to={"/create-trip"}>
            <Button className="rounded-xl bg-white text-black hover:bg-gray-100 px-3 text-sm md:text-base">
              + Create Trips
            </Button>
          </Link>
          <Link to={'/my-trips'}>
            <Button className="rounded-xl bg-white text-black hover:bg-gray-100 px-3 text-sm md:text-base">
              My Trips
            </Button>
          </Link>
          <Popover>
            <PopoverTrigger className="bg-transparent p-0">
              <img
                className="h-8 w-8 md:h-10 md:w-10 rounded-full cursor-pointer"
                src={user?.picture}
                alt="User"
              />
            </PopoverTrigger>
            <PopoverContent>
              <h2
                className="cursor-pointer text-black hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </h2>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={() => setOpenDialouge(true)} className="text-sm md:text-base">Sign In</Button>
      )}
      
      <Dialog open={openDialouge}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center space-x-2">
                <img src="logo.svg" className="h-8" alt="Logo" />
                <h1 className="text-black font-bold text-lg">Voyage</h1>
              </div>
              <h2 className="font-bold mt-5 text-lg">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
