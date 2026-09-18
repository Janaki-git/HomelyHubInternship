//to access the api key and to reocess

import Groq from "groq-sdk";
import dotenv from "dotenv";//helps to read .env file

dotenv.config();//loads the environment variable

const groq = new Groq({
    apiKey:process.env.GROQ_API_KEY
});

export default groq;
//we access through process.env
