import axios from 'axios';
export const loginUser=(data)=>axios.post("/api/users/login",data)
export const registerUser=(data)=>axios.post("/api/users/register",data)
export const logout=()=>axios.get("/api/users/logout");
export const addMyHotel=(hotelFormData)=>axios.post("/api/my-hotels/add-hotel",hotelFormData)
export const fetchMyHotels=()=>axios.get("/api/my-hotels/get-hotel")
export const getHotelById=(hotelId)=>axios.get(`/api/my-hotels/get-hotel-byId/${hotelId}`)
export const updateHotel=(formData,hotelId)=>axios.put(`/api/my-hotels/update-hotel/${hotelId}`,formData)
export const searchHotels=(queryParams)=>axios.get(`/api/hotels/search?${queryParams}`)
export const findHotelById=(hotelId)=>axios.get(`/api/hotels/hotel/${hotelId}`)
export const me=()=>axios.get('/api/users/me')
export const createPaymentIntent=(hotelId,numberOfNights)=>axios.post(`/api/hotels/${hotelId}/bookings/create-payment-intent`,{numberOfNights:numberOfNights})
export const hotelBookingRequest=(hotelId,formData)=>axios.post(`/api/hotels/${hotelId}/bookings`,formData)
export const myhotelbookings=()=>axios.get('/api/mybooking/booking')
export const getHotels=()=>axios.get("/api/hotels")



axios.interceptors.response.use((config)=>config,async (error)=>{
    const orignalRequest=error.config;
    if(error?.response?.status===401 && orignalRequest && !orignalRequest.isRetry){
        orignalRequest.isRetry=true;
        try {
            await axios.get("http://localhost:8000/api/users/refresh",{withCredentials:true});
            return axios.request(orignalRequest);
        } catch (error) {
            console.log(error.message)
        }
    }
    throw error;
})