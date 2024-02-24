import React from "react";

const PriceFilter = ({ selectedPrice, onChange }) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2 ">Max Price</h4>
      <select className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
      >
        <option value="">Select Max Price</option>
        {[1000, 2000, 3000, 4000, 5000].map((price) => (
          <option
            key={price}
            value={price}
            
          >
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
