import {createSlice} from "@reduxjs/toolkit"
const initialState={
    destination:'',
    checkIn:null,
    checkOut:null,
    adultCount:null,
    childCount:null,
    hotelId:'',

}

export const searchSlice=createSlice({
    name:"search",
    initialState,
    reducers:{
        setSearchContext:(state,action)=>{
            const searchObject=action.payload
            console.log(searchObject)
            state.destination=searchObject.destination
            state.checkIn=searchObject.checkIn
            state.checkOut=searchObject.checkOut
            state.adultCount=searchObject.adultCount
            state.childCount=searchObject.childCount
            state.hotelId=searchObject.hotelId
        }
    }
})

export const {setSearchContext}=searchSlice.actions
export default searchSlice.reducer