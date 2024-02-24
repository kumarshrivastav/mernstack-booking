import React, { useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setSearchContext,resetSearchContext } from "../state/searchSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const [userSearchContext, setUserSearchContext] = useState({
    destination: "",
    checkIn: new Date().toLocaleDateString(),
    checkOut: new Date().toLocaleDateString(),
    adultCount: 1,
    childCount: 0,
    hotelId: "",
  })
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(setSearchContext(userSearchContext));
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const clearUserContext=()=>{
    setUserSearchContext({
    destination: "",
    checkIn: new Date().toLocaleDateString(),
    checkOut: new Date().toLocaleDateString(),
    adultCount: 1,
    childCount: 0,
    hotelId: "",}
    )
    dispatch(resetSearchContext())
  }
  return (
    <form onSubmit={handleSubmit}  className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-5 items-center gap-4">
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          name="destination"
          id="destination"
          className="text-md w-full focus:outline-none"
          value={userSearchContext.destination}
          onChange={(e) =>
            setUserSearchContext({
              ...userSearchContext,
              [e.target.id]: e.target.value,
            })
          }
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            name="adultCount"
            id="adultCount"
            type="number"
            min={1}
            max={20}
            value={userSearchContext.adultCount}
            onChange={(e) =>
              setUserSearchContext({
                ...userSearchContext,
                [e.target.id]: e.target.value,
              })
            }
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            name="childCount"
            id="childCount"
            min={0}
            max={20}
            value={userSearchContext.childCount}
            onChange={(e) =>
              setUserSearchContext({
                ...userSearchContext,
                [e.target.id]: e.target.value,
              })
            }
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={userSearchContext.checkIn}
          onChange={(date) =>
            setUserSearchContext({ ...userSearchContext, checkIn: date.toLocaleDateString() })
          }
          selectsStart
          startDate={userSearchContext.checkIn}
          endDate={userSearchContext.checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={userSearchContext.checkOut}
          onChange={(date) =>
            setUserSearchContext({ ...userSearchContext, checkOut: date.toLocaleDateString() })
          }
          selectsStart
          startDate={userSearchContext.checkIn}
          endDate={userSearchContext.checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500"
        >
          Search
        </button>
        <button onClick={clearUserContext} className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
