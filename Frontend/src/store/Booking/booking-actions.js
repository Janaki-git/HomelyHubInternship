import { axiosInstance } from "../../utils/axios";
import { setBookingDetails,setBookings } from "./booking-slice";

//fetch the details
 export const fetchBookingDetails =(bookingId)=>async(dispatch)=>{
    try{
      const response = await axiosInstance.get(`/v1/rent/user/bookings/${bookingId}`)
      dispatch(setBookingDetails(response.data.data));
    }catch(error){
      console.log("error in fetching the details",error)
    }
    
}

//fetch the user bokings

export const fetchUserBookings =()=> async(dispatch)=>{
    try{
    const response = await axiosInstance.get("/v1/rent/user/bookings")
    dispatch(setBookings(response.data.data.bookings))
    }catch(error){
      console.log("error in fetching the details",error)
    }
}