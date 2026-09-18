// user schema work here 


import mongoose  from "mongoose";

import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto"
import { kMaxLength } from "node:buffer";
import { type } from "node:os";

const userSchema= new mongoose.Schema(
    //all felid are created here
    {
        name:{
            type:String,
            required:[true,"please enter youre name"],
            // sapces between name memory wasteage
            trim:true,//remove the sapces 
            maxLength:[50,"your name not greater then 50 characters"]
        },
        email:{
            type:String,
            required:[true,"please enter email"],
            unique:true,//no duplicate email
            lowercase:true,//all letters in lower allowed
            trim:true, //extra spaces removed
            validate:[validator.isEmail,"please enter the valid email address"]//checks the shape of email like @ gmail.com
            
        },
        password:{
            type:String,
            required:[true,"please enter password"],
            minlength:[6,"your password must be 6 char"],
            select:false,//password give by default one selected

        },
        passwordConfirm:{
            type:String,
            required:[true,"please check the password"],
            validate:{
                validator:function(el){
                    return el===this.password
                },
                message:"password wrong conformed"
            }

        },
        phoneNumber:{
            type:String,//we have 91 + so it is string +
            required:[true,"it requried"],
            trim:true,unique:true
        },
        //admit and user rool
        role:{
            type:String,
            enum:["user","admit"],
            default:"user"
        },
        //profile
        avatar:{
            url:{type:String},
            public_id:{type:String}
        },
        //if we want to change the password
        passwordChangedAt:{
            type:Date
        },
        passwordResetToken:{
            type:String,
            select:false,
            index:true
        },
        passwordResetExpires:{
            type:Date,
            select:false //stopes when it fetch 
        },

    },
    //when we update user then it will store here
    {timestamps:true}
)
//settings to mot pass in reapsonse from server
userSchema.set("toJSON",{
    transform:function(doc,ret){
        delete ret.password;//ret object above to send
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;//delete from the monggose version num
        return ret;
    }
})

//password logic
//hashing
userSchema.pre("save",async function(){
    if(!this.isModified("password"))return;

    this.password=await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined;//already saved no nedd to again save in db
   
});

//logic check
//tr@123 === encrypted password we can't do it so 
userSchema.methods.correctPassword= async function (candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changesTimestamp = parseInt(
            this.passwordChangedAt.getTime/1000,
            10
        );
        return JWTTimestamp<changesTimestamp
    }
    return false;
}

//forgot Password
userSchema.methods.createPasswordResetToken = function(){
    const resetToken=crypto.randomInt(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.passwordResetExpires = Date.now() +10 *60*1000;
    return resetToken;
}

//working model doing here

const User = mongoose.model("User",userSchema);//in maongo db :u u small sers
export{User};
