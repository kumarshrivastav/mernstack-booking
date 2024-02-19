import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHotelById, updateHotel } from "../http";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { toast } from "react-toastify";
const EditHotel = () => {
  const { hotelId } = useParams();
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const [hotelData, setHotelData] = useState(null);
  useEffect(() => {
    const fetchHotelById = async () => {
      try {
        const { data } = await getHotelById(hotelId);
        setHotelData(data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchHotelById();
  }, []);
  
  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const { data } = await updateHotel(formData, hotelId);
      setLoading(false)
      setHotelData(data)
      toast.success('Hotel Updated Successfully')
      return navigate('/my-hotels')
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message)
    }
  };
  return (
    <ManageHotelForm
      hotel={hotelData}
      onSave={handleSubmit}
      isLoading={loading}
    />
  );
};

export default EditHotel;
