import React, { useEffect, useState } from "react";
import { findHotelById, me } from "../http";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { useSelector } from "react-redux";

const Booking = () => {
    const {checkIn,checkOut,adultCount,childCount}=useSelector((state)=>state.search)
    const navigate=useNavigate()
    const location=useLocation()
  const [user, setUser] = useState({});
  const [hotel, setHotel] = useState({});
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState(0);
//   console.log(hotel)
  useEffect(() => {
    if (checkIn && checkOut) {
      const nights =
        Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [checkIn, checkOut]);
//   console.log(user?.email);
  useEffect(() => {
    const loggedInUser = async () => {
      try {
        const { data: currentUser } = await me();
        const { data: currentHotel } = await findHotelById(hotelId);
        setHotel(currentHotel);
        setUser(currentUser);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    loggedInUser();
  }, []);
//   if(!user.email){
//     navigate('/login',{state:{from:location}})
//   }
  if(!hotel){
    return <></>
  }
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
      <BookingDetailSummary
        checkIn={checkIn}
        checkOut={checkOut}
        adultCount={adultCount}
        childCount={childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {user && <BookingForm currentUser={user} />}
    </div>
  );
};

export default Booking;
