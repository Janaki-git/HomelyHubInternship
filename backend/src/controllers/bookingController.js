//login for booking
//work behind the cooking
//payments all details we can see here

import { Property } from "../Models/propertyModel.js";
import { Booking } from "../Models/bookingModel.js";

//createOrder :book property
const createOrder = async(req,res)=>{
    const {amount,propertyId,fromDate,toDate,guests}=req.body;

    //orderId
    const orderId ="order_"+Date.now();
    res.json({
        success:true,
        message:"order created Successfully",
        orderId,
        fromDate,
        toDate,
        amount,
        propertyId,
        guests
    })
}

//verify the payment 
const verifyPayment = async(req,res)=>{
    const {orderId,bookingDetails,forceStatus}=req.body;

    if(forceStatus ==="success"){
        const paymentId = "pay_"+Date.now();

        //save booking
        const newBooking = await Booking.create({
            user:req.user._id,
            property:bookingDetails.propertyId,
            price:bookingDetails.price,
            fromDate:bookingDetails.fromDate,
            toDate:bookingDetails.toDate,
            guests:bookingDetails.guests,
            numberOfnights:bookingDetails.nights,
            paid:true
        });

        //tell property those dates are taken

        const updatedProperty = await Property.findByIdAndUpdate(
            bookingDetails.propertyId,{
                $push:{
                    currentBookings:{
                        bookingId:newBooking._id,
                        fromDate:bookingDetails.fromDate,
                        toDate:bookingDetails.toDate,
                        userId:req.user._id
                    }
                }
            },
            {new:true}//for update the data not old 
        );
        res.json({
            success:true,
            message:"booking conformed!,payment successfull",
            paymentId,
            orderId,
            booking:newBooking
        });
    }else{
        res.status(400).json({
            success:false,
            message:"payment failed",
            orderId

        })
    }
}

//booking history gey my booking

const getUserBookings = async(req,res)=>{
    try{
        const bookings=await Booking.find({user:req.user._id});

        res.status(200).json({
            success:"success",
            data:{
                bookings
            }
        })

    }catch(error){
        res.status(401).json({
            status:"false",
            message:error.message

        })
    }
}

//get one booking details

const getBookingDetails = async(req,res)=>{
    try{
    const booking = await Booking.findById(req.params.bookingId);
        res.status(200).json({
            status:"Success",
            data:{
                booking
            }
        })
    }catch(error){
        res.status(401).json({
            status:"false",
            message:error.message

        })
    }
}

export{getBookingDetails,getUserBookings,verifyPayment,createOrder}