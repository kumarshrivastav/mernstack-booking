import React from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchContext } from "../../state/searchSlice";
import { useLocation, useNavigate } from "react-router-dom";

const GuestInfo = ({ hotelId, pricePerNight }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate=useNavigate()
  const location=useLocation()
  const {
    destination,
    checkIn: checkin,
    checkOut: checkout,
    adultCount,
    childCount,
  } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkIn: checkin,
      checkOut: checkout,
      adultCount,
      childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const onSignInClick = (data) => {
    dispatch(
      setSearchContext({
        destination: "",
        adultCount: data.adultCount,
        childCount: data.childCount,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
      })
    )
    navigate('/login',{state:{from:location}})
  };
  const onSubmit = (data) => {
    dispatch(
      setSearchContext({
        destination: "",
        adultCount: data.adultCount,
        childCount: data.childCount,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
      })
    )
    navigate(`/hotel/${hotelId}/booking`)
  };
  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form onSubmit={currentUser ? handleSubmit(onSubmit):handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
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
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least on adult",
                  },
                  valueAsNumber: true,
                })}
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
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {currentUser ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfo;
