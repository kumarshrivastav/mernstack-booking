import {createSlice} from "@reduxjs/toolkit"
// import {loadStripe} from "@stripe/stripe-js"
// const STRIPE_PUB_KEY=import.meta.env.VITE_STRIPE_PUB_KEY || ''
// const stripePromise=loadStripe(STRIPE_PUB_KEY)

const initialState={
    loading:false,
    error:null,
    currentUser:null
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        StartSignIn:(state)=>{
            state.loading=true
            state.error=null
        },
        SignInSuccess:(state,action)=>{
            state.loading=false;
            state.currentUser=action.payload;
            state.error=null
        },
        SignInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        SignOutStart:(state)=>{
            state.loading=true;
            state.error=null
        },
        SignOutSuccess:(state)=>{
            state.loading=false
            state.currentUser=null
            state.error=null
        },
        SignOutFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})
export const {StartSignIn,SignInFailure,SignInSuccess,SignOutFailure,SignOutStart,SignOutSuccess}=userSlice.actions
export default userSlice.reducer