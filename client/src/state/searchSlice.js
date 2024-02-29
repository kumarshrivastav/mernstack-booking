import {createSlice} from "@reduxjs/toolkit"
const initialState={
    destination:'',
    checkIn:new Date().toISOString(),
    checkOut:new Date().toISOString(),
    adultCount:'1',
    childCount:'0',
    hotelId:''
}

export const searchSlice=createSlice({
    name:"search",
    initialState,
    reducers:{
        setSearchContext:(state,action)=>{
            const searchObject=action.payload

            state.destination=searchObject.destination
            sessionStorage.setItem('destination',searchObject.destination)

            state.checkIn=new Date(searchObject.checkIn).toISOString()
            sessionStorage.setItem('checkIn',searchObject.checkIn)

            state.checkOut=new Date(searchObject.checkOut).toISOString()
            sessionStorage.setItem('checkOut',searchObject.checkOut)

            state.adultCount=searchObject.adultCount
            sessionStorage.setItem('adultCount',searchObject.adultCount.toString())

            state.childCount=searchObject.childCount
            sessionStorage.setItem('childCount',searchObject.childCount.toString())
            
        },
        resetSearchContext:(state)=>{
            state.destination=''
            state.checkIn=new Date().toISOString(),
            state.checkOut=new Date().toISOString(),
            state.adultCount='1'
            state.childCount='0'
            state.hotelId=''
            sessionStorage.clear()

        }
    }
})

export const {setSearchContext,resetSearchContext}=searchSlice.actions
export default searchSlice.reducer