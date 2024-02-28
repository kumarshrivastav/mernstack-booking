import React, { useEffect, useState } from 'react'
import { getHotels } from '../http'
import LatestDestinationCard from '../components/LatestDestinationCard'

const Home = () => {
    const [hotels,setHotels]=useState([])
    const [topRowHotels,setTopRowHotels]=useState([])
    const [bottomRowHotels,setBottomRowHotels]=useState([])
    useEffect(()=>{
        const hotel=async ()=>{
            try {
                const {data}=await getHotels()
                setTopRowHotels(data?.slice(0,2) || [])
                setBottomRowHotels(data?.slice(2) || [])
                setHotels(data)
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        hotel()
    })
  return (
    <div className='space-y-3'>
      <h2 className=' text-3xl font-bold'>Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <dir className='grid gap-4'>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            {
                topRowHotels.map((hotel)=>(
                    <LatestDestinationCard hotel={hotel}/>
                ))
            }
        </div>
        <div className='grid md:grid-cols-3 gap-4'>
            {
                bottomRowHotels.map((hotel)=>(
                    <LatestDestinationCard hotel={hotel}/>
                ))
            }
        </div>
      </dir>
    </div>
  )
}

export default Home
