import React from "react";
import { useForm } from "react-hook-form";

const BookingForm = ({ currentUser }) => {
    // console.log(currentUser)
  const { handleSubmit, register } = useForm();
  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-500 p-3">
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
            {...register('firstName')}
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
            {...register('lastName')}
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
            {...register('email')}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
      </div>
    </form>
  );
};

export default BookingForm;
