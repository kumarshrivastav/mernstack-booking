import { query } from 'express'
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { searchHotels } from '../http'
import SearchResultCard from '../components/SearchResultCard'
import Pagination from '../components/Pagination'
type dataType = {
    data: [],
    pagination: {
        page: number,
        pages: number,
        total: number
    }
}
const Search = () => {
    const { destination, checkIn, checkOut, adultCount, childCount, hotelId } = useSelector((state: any) => state.search)
    // console.log(destination,checkIn.toString(),checkOut.toString(),adultCount,childCount)
    const [page, setPage] = useState(1)
    const queryParams = new URLSearchParams()
    const [hotelsData, setHotelsData] = useState<dataType>()
    queryParams.append('destination', destination || "")
    queryParams.append('checkIn', checkIn || "")
    queryParams.append('checkOut', checkOut || "")
    queryParams.append('adultCount', adultCount || "")
    queryParams.append('childCount', childCount || "")
    queryParams.append('page', page.toString() || "")
    useEffect(() => {
        const fetchHotelsByAPI = async () => {
            try {
                const { data } = await searchHotels(queryParams)
                setHotelsData(data)
                console.log(data)
            } catch (error) {
                // setHotelsData<dataType>()
                console.log(error.response.data.message)
            }
        }
        fetchHotelsByAPI()
    }, [page])
    const pageChange=(page:never)=>{
        setPage(page)
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
                <div className='space-y-5'>
                    <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>Filter By:</h3>
                </div>
            </div>
            <div className='flex flex-col gap-5 '>
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold'>
                        {hotelsData?.pagination.total} Hotels found
                        {destination ? ` in ${destination}` : ""}
                    </span>
                    {/* sort options */}
                </div>
                {
                    hotelsData?.data?.map((hotel: any) => (
                        <SearchResultCard hotel={hotel} key={hotel._id} />
                    ))
                }
                <div>
                    <Pagination 
                    page={hotelsData?.pagination.page || 1} 
                    pages={hotelsData?.pagination.pages || 1} 
                    onPageChange={pageChange} />
                </div>
            </div>
        </div>
    )
}

export default Search
