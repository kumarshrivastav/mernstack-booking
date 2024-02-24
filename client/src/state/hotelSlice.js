import {createSlice} from "@reduxjs/toolkit"
const initialState={
    hotelInfo:{},
    page:1,
    pages:1
}
export const hotelSlice=createSlice({
    name:'hotelInfo',
    initialState,
    reducers:{
        setHotels:(state,action)=>{
            state.hotelInfo=action.payload
        },
        setPage:(state,action)=>{
            state.page=action.payload
        },
        setPages:(state,action)=>{
            state.pages=action.payload
        }
    }
})

export const {setHotels,setPage,setPages}=hotelSlice.actions
export default hotelSlice.reducer