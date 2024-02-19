import axios from 'axios';
export const loginUser=(data)=>axios.post("/api/users/login",data)
export const registerUser=(data)=>axios.post("/api/users/register",data)
export const logout=()=>axios.get("/api/users/logout");
export const addMyHotel=(hotelFormData)=>axios.post("/api/my-hotels/add-hotel",hotelFormData)
export const fetchMyHotels=()=>axios.get("/api/my-hotels/get-hotel")

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