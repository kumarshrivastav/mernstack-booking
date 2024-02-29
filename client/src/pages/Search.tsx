import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import SearchResultCard from '../components/SearchResultCard'
import Pagination from '../components/Pagination'
import StarRatingFilter from '../components/StarRatingFilter'
import { searchHotels } from '../http'
import { setHotels, setPage, setPages } from '../state/hotelSlice'
import HotelTypeFilter from '../components/HotelTypeFilter'
import FacilitiesFilter from '../components/FacilitiesFilter'
import PriceFilter from '../components/PriceFilter'
const Search = () => {
    const dispatch = useDispatch()
    const { hotelInfo, page } = useSelector((state: any) => state.hotelInfo)
    const { destination, checkIn, checkOut, adultCount, childCount } = useSelector((state: any) => state.search)
    const [facilities, setFacilities] = useState<string[]>([])
    const [types, setTypes] = useState<string[]>([])
    const [stars, setStars] = useState<string[]>([])
    const [maxPrice, setMaxPrice] = useState<number | undefined>()
    const [sortOption, setSortOpton] = useState<string>("")
    const queryParams = new URLSearchParams()
    queryParams.append('destination', destination || "")
    queryParams.append('checkIn', checkIn || "")
    queryParams.append('checkOut', checkOut || "")
    queryParams.append('adultCount', adultCount || "")
    queryParams.append('childCount', childCount || "")
    queryParams.append('page', page.toString() || "")
    queryParams.append('maxPrice', maxPrice?.toString() || "")
    queryParams.append('sortOption', sortOption || '')
    facilities?.forEach((facility) => queryParams.append('facilities', facility))
    types?.forEach((type) => queryParams.append('types', type))
    stars?.forEach((star) => queryParams.append('stars', star))

    const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const starRating = e.target.value;
        setStars((prevStars) => e.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating))
    }
    const handleHotelTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const hotelType = e.target.value
        setTypes((prevHotelType) => e.target.checked ? [...prevHotelType, hotelType] : prevHotelType.filter((Type) => Type !== hotelType))
    }
    const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const hotelFacility = e.target.value
        setFacilities((prevFacility) => e.target.checked ? [...prevFacility, hotelFacility] : prevFacility.filter((hotelFac) => hotelFac !== hotelFacility))
    }
    const handleSearch = async () => {
        try {
            const { data } = await searchHotels(queryParams)
            dispatch(setHotels(data))
            dispatch(setPage(data?.pagination?.page))
            dispatch(setPages(data?.pagination?.pages))
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        handleSearch()
    }, [page, destination, stars, types,facilities,maxPrice,sortOption])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
                <div className='space-y-5'>
                    <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>Filter By:</h3>
                    <StarRatingFilter selectedStars={stars} onChange={handleStarsChange} />
                    <HotelTypeFilter selectedHotelTypes={types} onChange={handleHotelTypeChange} />
                    <FacilitiesFilter selectedFacilities={facilities} onChange={handleFacilityChange}/>
                    <PriceFilter selectedPrice={maxPrice} onChange={(value?:number)=>setMaxPrice(value)}/>
                </div>
            </div>
            <div className='flex flex-col gap-5 '>
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold'>
                        {hotelInfo?.pagination.total} Hotels found
                        {destination ? ` in ${destination}` : ""}
                    </span>
                    {/* sort options */}
                    <select value={sortOption} onChange={(e)=>setSortOpton(e.target.value)} className='p-2 border rounded-md'>
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night (low to high)</option>
                        <option value="pricePerNightDesc">Price Per Night (high to low)</option>
                    </select>
                </div>
                {
                    hotelInfo?.data?.map((hotel: any) => (
                        <SearchResultCard hotel={hotel} key={hotel._id} />
                    ))
                }
                <div>
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default Search
