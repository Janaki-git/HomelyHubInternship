//details of the user wants
//recv user info
//validate the user info
//send info to our ai trip plannner
//calculating the budget
//search mangodb for suitable properties
//send  both Ai trip plan and matching  properites to the frontend /user

import {Property} from "../Models/propertyModel.js"
import {planTrip} from "../ai/tripPlanner.js"
import {generateDescription} from "../ai/generateDescription.js"

const cleanCity =(text) => text.toLowerCase().replaceAll(" ","") //removeing the spaces and converting lower to small if they type deLhi


const createTripPlan = async(req,res) =>{
    //res=
    // frontend  will cal our trip plan API 
    //req=text that we are asking to API comes from front end
    //res= sending the info back to frontend
    //async= while doing operations that will take time so use this
    try{
        
        const {destination,budget,days,people,interests} = req.body
        if(!destination || !budget || !days ||!people){
            return res.status(400).json({
              status:"false",
              message:"please to fill the features "
            })
            
        }
        const plan = await planTrip({
           destination,
           budget,
           days,
           people,
           interests : interests || [] //if user not send anythinf so empty array
        });

        const perNight = Number(budget)/Number(days);

        const city=cleanCity(destination);

        const properties = await Property.find({
            $or:[
                {
                    "address.city": city
                },
                {"address.state":city},
                {"address.area":city}
            ],
            price:{$lte:perNight},//less then or equal (lte ang gte a too)
            maximumGuest:{$gte:Number(people)},
        }).limit(6); // matching properties are 6 no need to 100 properites to compare

        res.status(200).json({
            status:"Success",
            data:{plan,properties,perNight}
        })
        

    }catch(error){
       res.status(500).json({
        status:"fail",
        message:"could not  create a trip ! please try again"
       })
    }
}
const writeDescription = async (req, res) => {
    try {
        const description = await generateDescription(req.body);

        res.status(200).json({
            status: "Success",
            data: { description }
        });
    } catch (error) {
        console.error("AI Description Error:", error);

        res.status(500).json({
            status: "fail",
            message: "Could not generate description"
        });
    }
};
export {createTripPlan ,writeDescription} ;