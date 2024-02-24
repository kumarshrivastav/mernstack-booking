import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../state/hotelSlice'
const Pagination = () => {
    const {page,pages}=useSelector(state=>state.hotelInfo)
    const dispatch=useDispatch()
    const pageNumbers=[]
    for(let i=1;i<=pages;i++){
        pageNumbers.push(i)
    }
    return (
    <div className='flex justify-center'>
        <ul className='flex border border-slate-300'>
            {pageNumbers.map((number)=>(
                <li key={number} className={`px-2 py-1 ${page===number ? "bg-gray-200":""}`}>
                    <button onClick={()=>dispatch(setPage(number))}>{number}</button>
                </li>
            ))}
        </ul>
      
    </div>
  )
}

export default Pagination
