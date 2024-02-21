import { query } from 'express'
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { searchHotels } from '../http'
const Search = () => {
    const { destination, checkIn, checkOut, adultCount, childCount, hotelId } = useSelector((state: any) => state.search)
    // console.log(destination,checkIn.toString(),checkOut.toString(),adultCount,childCount)
    const [page, setPage] = useState("1")
    const queryParams = new URLSearchParams()
    queryParams.append('destination', destination || "")
    queryParams.append('checkIn', checkIn || "")
    queryParams.append('checkOut', checkOut || "")
    queryParams.append('adultCount', adultCount || "")
    queryParams.append('childCount', childCount || "")
    queryParams.append('page', page || "")
    useEffect(()=>{
        const fetchHotelsByAPI=async ()=>{
            try {
                const { data } = await searchHotels(queryParams)
                console.log(data)
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        fetchHotelsByAPI()
    },[queryParams])
    return (
        <div>
            Search Page
        </div>
    )
}

export default Search
