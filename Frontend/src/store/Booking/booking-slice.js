//managing bookins

//store all bookings
//store individual booking details
//tract the api loading status
//add new bookings when bokkins created
//updating the obbokins data when we receive the backend

//

import { createSlice } from "@reduxjs/toolkit";
import BookingDetails from "../../components/myBookings/BookingDetails";

const initialState={
    bookings:[],
    bookingDetails:{},
    loading:false
}

const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{
        setBookingRequest:(state)=>{
           state.loading=true;
        },
        //it stores the bookings from the user data
        setBookings(state,actions){
            state.bookings=actions.payload;
            state.loading=false
        },
        addBooking:(state,action)=>{
            state.bookings.push(action.payload);
        },
        setBookingDetails:(state,action)=>{
            state.bookingDetails=action.payload.bookings;
        },
        
    }

})
export const{setBookings,addBooking,setBookingDetails}=bookingSlice.actions;
export default bookingSlice;