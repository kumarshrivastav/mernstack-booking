import { CardElement} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { hotelBookingRequest } from "../../http";
import { resetSearchContext } from "../../state/searchSlice";
const BookingForm = ({ currentUser, paymentIntent }) => {
  // console.log(currentUser)
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { hotelId } = useParams();
  const { adultCount, childCount, checkIn, checkOut } = useSelector(
    (state) => state.search
  );
  const { handleSubmit, register } = useForm();
  const defaultValues={
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      name:currentUser.firstName+' '+currentUser.lastName,
      address:'Bhopal',
      email: currentUser?.email,
      adultCount,
      shippingAddress:'Kolkata, India',
      billingAddress:'Chennai, India',
      description:'As per Indian regulations, export transactions require a description. More info here: https://stripe.com/docs/india-exports',
      childCount,
      checkIn,
      checkOut,
      hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
  }
  const stripe = useStripe();
  const elements = useElements();
  const onSubmit = async () => {
    try {
      setLoading(true)
      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          }
        },
      );
      if(result.error){
        setLoading(false)
      }
      if (result.paymentIntent?.status === "succeeded") {
        const { data } = await hotelBookingRequest(hotelId,{
          ...defaultValues,
          paymentIntentId: result.paymentIntent.id,
        });
        toast.success('Hotel Booking Successfully')
        setLoading(false)
        dispatch(resetSearchContext())
        return navigate('/search')
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 rounded-lg border border-slate-500 p-3">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            name="name"
            id="firstName"
            readOnly
            disabled
            value={currentUser?.firstName}
            {...register("firstName")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            name="name"
            id="lastName"
            readOnly
            disabled
            value={currentUser?.lastName}
            {...register("lastName")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            name="email"
            id="email"
            readOnly
            disabled
            value={currentUser?.email}
            {...register("email")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summanry</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ${paymentIntent?.totalCost?.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button disabled={loading} type="submit" className="bg-blue-600 text-white font-bold p-2 rounded-md hover:bg-blue-500 disabled:bg-gray-500 text-md">
          {
            loading ? "Saving...":"Confirm Booking"
          }
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
