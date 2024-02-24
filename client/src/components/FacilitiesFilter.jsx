import React from 'react'
import {hotelFacilities} from "../config/hotels-options-config.js"
const FacilitiesFilter = ({selectedFacilities,onChange}) => {
    return (
        <div className="border-b border-slate-300 pb-5">
          <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>
          {hotelFacilities.map((facility) => (
            <label key={facility} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="type"
                id="type"
                value={facility}
                className="rounded"
                checked={selectedFacilities.includes(facility)}
                onChange={onChange}
              />
              <span>{facility}</span>
            </label>
          ))}
        </div>
      );
}

export default FacilitiesFilter
