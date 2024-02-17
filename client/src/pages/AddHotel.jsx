import React, { useState } from 'react'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { addMyHotel } from '../http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const AddHotel = () => {
  const [isLoading,setLoading]=useState(false)
  const navigate=useNavigate()
  const handleSave= async (hotelFormData)=>{
    try {
      setLoading(true);
      await addMyHotel(hotelFormData)
      toast.success('Hotel Saved!')
      return navigate('/')
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
  }
  return (
  <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
  )
}

export default AddHotel
