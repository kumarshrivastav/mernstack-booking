import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOutButton from "./SignOutButton";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log("header:", isLoggedIn);
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tighter">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {currentUser ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-gray-500"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-gray-500"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              to="/login"
            >
              SignIn
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
