import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findHotelById } from "../http";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import GuestInfo from "../forms/GuestInfo/GuestInfo";
const Detail = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({});
  console.log(hotel)
  useEffect(() => {

    const hotelById = async () => {
      try {
        const { data } = await findHotelById(hotelId);
        setHotel(data);
        // navigate('/detail')
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    hotelById();
  }, [hotelId]);
  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar key={uuidV4()} className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel?.imageUrls?.map((image) => (
          <div className="h-[300px]" key={image}>
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel?.facilities?.map((facility)=>(
            <div className="border border-slate-300 rounded-sm p-3" key={facility}>{facility}</div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
            <GuestInfo hotelId={hotelId} pricePerNight={hotel.pricePerNight}/>
        </div>
      </div>
    </div>
  );
};

export default Detail;
