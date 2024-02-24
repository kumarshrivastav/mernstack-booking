import React from "react";
import { hotelTypes } from "../config/hotels-options-config";
const HotelTypeFilter = ({ selectedHotelTypes, onChange }) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((type) => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="type"
            id="type"
            value={type}
            className="rounded"
            checked={selectedHotelTypes.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypeFilter;
