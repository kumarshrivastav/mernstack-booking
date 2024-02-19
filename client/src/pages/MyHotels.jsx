import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMyHotels } from "../http/index.js";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
const MyHotels = () => {
  const [hotelData, setHotelData] = useState([]);
  useEffect(() => {
    const fetchMyHotel = async () => {
      try {
        const { data } = await fetchMyHotels();
        console.log(data);
        setHotelData(data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMyHotel();
  }, []);
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8 ">
        {hotelData.length === 0 ? (
          <span>No Hotels Found</span>
        ) : (
          <>
            {hotelData.map((hotel) => (
              <div key={hotel._id} className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="grid grid-cols-5 gap-2">
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center ">
                    <BsMap className="mr-1" />
                    {hotel.city}, {hotel.country}
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center ">
                    <BsBuilding className="mr-1" />
                    {hotel.type}
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center ">
                    <BiMoney className="mr-1" />
                    {hotel.pricePerNight} per night
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center ">
                    <BiHotel className="mr-1" />
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center ">
                    <BiStar className="mr-1" />
                    {hotel.starRating} start rating
                  </div>
                </div>
                <span className="flex justify-end">
                  <Link
                    className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                    to={`/edit-hotel/${hotel._id}?type=update`}
                  >
                    View Details
                  </Link>
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyHotels;
