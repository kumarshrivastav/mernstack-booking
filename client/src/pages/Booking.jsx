import React, { useEffect, useState } from "react";
import { createPaymentIntent, findHotelById, me } from "../http";
import BookingForm from "../forms/BookingForm/BookingForm";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const STRIPE_PUB_KEY=import.meta.env.VITE_STRIPE_PUB_KEY || ''
const stripePromise=loadStripe(STRIPE_PUB_KEY)
const Booking = () => {
  const { destination,checkIn, checkOut, adultCount, childCount } = useSelector(
    (state) => state.search
  );
  const [user, setUser] = useState({});
  const [hotel, setHotel] = useState({});
  const [paymentIntentData,setPaymentIntentData]=useState({})
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState(0);
  useEffect(() => {
    if (checkIn && checkOut) {
      const nights =
        Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [checkIn, checkOut]);
  


  const createPaymentIntents = async () => {
    try {
      const { data} = await createPaymentIntent(
        hotelId,
        parseInt(numberOfNights)
      );
      setPaymentIntentData(data)
    } catch (error) {
      console.log(error);
    }
  };

  const loggedInUser = async () => {
    try {
      const { data } = await me();
      setUser(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const findHotel=async ()=>{
    try {
      const { data } = await findHotelById(hotelId);
      setHotel(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    Promise.all([findHotel(),loggedInUser(),createPaymentIntents()])
  }, [hotelId,numberOfNights,destination])

  if (!hotel) {
    return <></>;
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
      {user && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentData.clientSecret }}
        >
          <BookingForm currentUser={user} paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
