import express from "express";

const bookingRouter = express.Router();

import { createOrder } from "../controllers/bookingController.js";
import { verifyPayment } from "../controllers/bookingController.js";
import { getBookingDetails } from "../controllers/bookingController.js";
import { getUserBookings } from "../controllers/bookingController.js";
import { protect } from "../controllers/authController.js";

bookingRouter.get("/",protect,getUserBookings);
bookingRouter.get("/:bookingId",protect,getBookingDetails);///bookingId will click getBookingDetails will run
bookingRouter.post("/create-order",protect,createOrder);
bookingRouter.post("/verify-payment",protect,verifyPayment);

export{bookingRouter};