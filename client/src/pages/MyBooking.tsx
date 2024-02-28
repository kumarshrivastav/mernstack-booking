import React, { useEffect, useState } from 'react'
import { myhotelbookings } from '../http'

const MyBooking = () => {
    const [myBooking, setMyBooking] = useState([])
    console.log(myBooking)
    useEffect(() => {
        const myHotelBooking = async () => {
            try {
                const { data } = await myhotelbookings()
                setMyBooking(data)
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        myHotelBooking()
    })
    if (!myBooking || myBooking.length === 0) {
        return <span>No Bookings Found</span>
    }
    return (
        <div className='space-y-5'>
            <h1 className='text-3xl font-bold'>
                My Bookings
            </h1>
            {
                myBooking.map((hotel: any) => (
                    <div key={hotel._id} className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5'>
                        <div className='lg:w-full lg:h-[250px]'>
                            <img src={hotel?.imageUrls[0]} alt="hotel-image" className='w-full h-full object-cover object-center' />
                        </div>
                        <div className='flex flex-col gap-4 overflow-y-auto max-h-[300px]'>
                            <div className='text-2xl font-bold'>
                                {hotel.name}
                                <div className='text-xs font-normal'>
                                    {hotel.city}, {hotel.country}
                                </div>
                            </div>
                        {
                            hotel.bookings.map((booking: any) => (
                                <div key={booking._id}>
                                    <div>
                                        <span className='font-bold mr-2'>Dates:</span>
                                        <span>{new Date(booking.checkIn).toDateString()} - {new Date(booking.checkOut).toDateString()}</span>
                                    </div>
                                    <div>
                                        <span className='font-bold mr-2'>Guests:</span>
                                        <span>
                                            {booking.adultCount} adults, {booking.childCount} children
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MyBooking
