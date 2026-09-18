import express from "express";// it creates the server

import dotenv from "dotenv";//reads the be .env
import cors from "cors";//who is allowed to call the backend
import cookieparser from "cookie-parser"//cookies reads from browser sends
import connectDB from "./utils/db.js";// path
import {router} from "./routes/userRoutes.js"
import { propertyRouter } from "./routes/propertyRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import { tripRouter } from "./routes/tripRouter.js";

dotenv.config();//it process or hold the variables

const app=express();

//first miiddle ware
//express.json understand the json body
app.use(express.json({limit:"100mb"}))

//urlencoded
app.use(express.urlencoded({limit:"100mb",extended:true}))//it can handled the nested data and also paln data so true

//cookieParser all data is stored of ours
app.use(cookieparser())//it split the cookie text into clean object
//request passes through this 3 middlewares

app.use(cors({
    origin:process.env.ORIGIN_ACCESS_URL,
    credentials:true
}))

const PORT=process.env.PORT;


//test the route

app.get("/",(req,res)=>{
    res.send("Welcome! to HOMELYHUB ");
})

app.use("/api/v1/rent/user",router)// given common url for login,signup
app.use("/api/v1/rent/listing",propertyRouter)
app.use("/api/v1/rent/user/booking",bookingRouter)
app.use("/api/v1/rent/trip",tripRouter)
connectDB(); 

app.listen(PORT,()=>{
    console.log(`App is running successfully: ${PORT}`);
})//to excute rge folder
//this server is created and setup the express server