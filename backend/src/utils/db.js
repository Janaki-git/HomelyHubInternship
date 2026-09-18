// here we are wrting mangodb file 

import mongoose from "mongoose"

const connectDB=async()=>{
    //if system crashes
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo connect')
    }catch(error){
       console.error("mongo connection failed",error);
       process.exit(1);//if error is crashes it will exit 
    }
}

//to import to another file
export default connectDB;