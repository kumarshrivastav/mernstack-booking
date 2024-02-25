import React from "react";

const BookingDetailSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}) => {
    // console.log('checkIn-',checkIn,'checkOut-',checkOut)
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
            Check-in
            <div className="font-bold">{new Date(checkIn).toDateString()}</div>
        </div>
        <div>
            Check-out
            <div className="font-bold">{new Date(checkOut).toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>
      <div>
        Guests{" "}
        <div className="font-bold">{adultCount} adults & {childCount} children</div>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
