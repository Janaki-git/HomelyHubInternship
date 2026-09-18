import slugify from 'slugify';
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    propertyName:{
        type: String,
        required:[true,"please enter name"]
    },
    description:{
        type:String,
        required:[true,"please add info of property"]
    },
    extraInfo:{
        type:String,
        deafult:"this is awosome"
    },
    propertyType:{
        type:String,
        enum:["House","Flat","Guest House","Hotel"],
        default:"House"
    },
    roomType:{
        type:String,
        enum:["Anytype","Entire Home","Room"],
        default:"Anytype"
    },
    maximumGuest:{
        type:Number,
        required:[true,"please enter maximum guests"]

    },
    //amenities means facilities extra facility
    amenties:[
        {
            name:{
                type:String,
                required:[true],
                enum:[
                    "wifi","kitchen","Ac","Tv","pool","free parking"
                ]
            },
            icon:{
                type:String,
                required:true
            }
        }
    ],
    images:{
        type:[
            {
               public_id:{
                type:String

               },
               url:{
                type:String,
                required:true
               } 
            }
        ],
        validate:{
            validator:function(arr){
                return arr.length >=6;
            },
            message: "the images atleast 6 "
        }
    },
    price:{
        type:Number,
        required:[true,"please enter the price"],
        default:250
    },
    address:{
        area:String,
        city:String,
        state:String,
        pincode:Number
    },
    currentBookings:[
        {
            bookingId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Booking"
            },
            fromDate:{
                type:Date
            },
            toDate:{
                type:Date
            },
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    slug:String,
    checkInTime:{type:String,default:"12:00"},
    checkOutTime:{type:String,default:"14:00"}
})
//convertt propertyname into friendly url name slugify
propertySchema.pre("save",function(){
    this.slug = slugify(this.propertyName,{lower:true});
    
})

//sometypes we type lower and spaces so it will convert and easy to search
propertySchema.pre("save",function(){
    this,this.address.city = this.address.city.toLowerCase().replaceAll(" ","")
    
})

//working model
//const Property = mongoose.model("Property",propertySchema);
const Property = mongoose.models.Property || mongoose.model("Property",propertySchema);
//if property is exsistes use ,otherwise create new one property
export{Property};