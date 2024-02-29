import {createSlice} from "@reduxjs/toolkit"
const initialState={
    destination:sessionStorage.getItem('destination') || '',
    checkIn:new Date(sessionStorage.getItem('checkIn') || new Date()).toISOString(),
    checkOut:new Date(sessionStorage.getItem('checkOut') || new Date()).toISOString(),
    adultCount:parseInt(sessionStorage.getItem('adultCount') || '1'),
    childCount:parseInt(sessionStorage.getItem('adultCount') || '0'),
    hotelId:sessionStorage.getItem('hotelId') || '',

}

export const searchSlice=createSlice({
    name:"search",
    initialState,
    reducers:{
        setSearchContext:(state,action)=>{
            const searchObject=action.payload
            // console.log(searchObject)
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

            if(searchObject.hotelId){
                state.hotelId=searchObject.hotelId
                sessionStorage.setItem('hotelId',searchObject.hotelId.toString())
            }
            
        },
        resetSearchContext:(state)=>{
            state.destination=''
            sessionStorage.removeItem('destination')
            state.checkIn=new Date().toISOString(),
            sessionStorage.removeItem('checkIn')
            state.checkOut=new Date().toISOString(),
            sessionStorage.removeItem('checkOut')
            state.adultCount=null,
            sessionStorage.removeItem('adultCount')
            state.childCount=null,
            sessionStorage.removeItem('childCount')
            state.hotelId=''
            sessionStorage.removeItem('hotelId')
        }
    }
})

export const {setSearchContext,resetSearchContext}=searchSlice.actions
export default searchSlice.reducer